import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    __wp_state?: {
      targetMouse: [number, number];
      mouse:       [number, number];
      mvel:        [number, number];
      clicks:      [number, number, number][];
      clickIdx:    number;
      t0:          number;
    };
  }
}

const VERT = `
attribute vec2 a_pos;
void main(){ gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;
uniform vec2  u_res;
uniform float u_time;
uniform vec2  u_mouse;
uniform vec2  u_mvel;
uniform vec3  u_clicks[8];
uniform float u_speed;
uniform float u_intensity;
uniform float u_mstrength;
uniform float u_hue;
uniform float u_grain;

float hash(vec2 p){ p=fract(p*vec2(123.34,456.21)); p+=dot(p,p+45.32); return fract(p.x*p.y); }
float noise(vec2 p){
  vec2 i=floor(p),f=fract(p);
  float a=hash(i),b=hash(i+vec2(1.,0.)),c=hash(i+vec2(0.,1.)),d=hash(i+vec2(1.,1.));
  vec2 u=f*f*(3.-2.*f);
  return mix(a,b,u.x)+(c-a)*u.y*(1.-u.x)+(d-b)*u.x*u.y;
}
float fbm(vec2 p){
  float v=0.,a=0.5;
  for(int i=0;i<5;i++){ v+=a*noise(p); p*=2.03; a*=0.5; }
  return v;
}

void main(){
  vec2 uv = gl_FragCoord.xy / u_res.xy;
  float t  = u_time * 0.03 * u_speed;
  vec2  m  = (u_mouse - 0.5) * 0.14 * u_mstrength;

  vec3 white  = vec3(0.930, 0.975, 0.965);
  vec3 cream  = vec3(0.860, 0.945, 0.925);
  vec3 peach  = vec3(0.078, 0.722, 0.651);
  vec3 brown  = vec3(0.030, 0.190, 0.175);
  vec3 copper = vec3(0.220, 0.620, 0.580);

  vec3 col = mix(white * 0.985, white, smoothstep(0.0, 1.0, uv.y));
  col = mix(col, cream, smoothstep(0.2, 1.0, uv.x) * 0.35);

  float n1 = fbm(uv * 1.4 + vec2(t, -t * 0.6) + m * 1.6);
  float n2 = fbm(uv * 1.0 + vec2(-t * 0.4, t * 1.1) + m);
  vec2  q  = uv + (vec2(n1, n2) - 0.5) * 0.22 + m;

  col = mix(col, peach,         exp(-length((q - vec2(0.88, 0.55)) * vec2(1.45, 1.55)) * 2.0) * 0.60);
  col = mix(col, peach * 0.95,  exp(-length((q - vec2(0.78, 0.40)) * vec2(2.6,  2.6))  * 2.4) * 0.30);
  col = mix(col, brown,         exp(-length((q - vec2(0.08, 0.22)) * vec2(1.35, 1.55)) * 2.4) * 0.62);
  col = mix(col, copper,        exp(-length((q - vec2(0.40, 0.10)) * vec2(1.9,  2.6))  * 2.0) * 0.18);

  vec2  ar    = vec2(u_res.x / u_res.y, 1.0);
  float mDist = length((uv - u_mouse) * ar);
  col = mix(col, brown,         exp(-mDist * 3.2) * 0.65 * u_mstrength);
  col = mix(col, brown * 0.85,  exp(-mDist * 1.5) * 0.18 * u_mstrength);

  col *= 1.0 - 0.18 * pow(length(uv - 0.5) * 1.2, 2.0);
  col  = mix(vec3(dot(col, vec3(0.33))), col, u_intensity);

  float g = hash(uv * u_res + u_time * 60.0);
  col += (g - 0.5) * u_grain * 0.18;

  gl_FragColor = vec4(col, 1.0);
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const sh = gl.createShader(type)!;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) { console.error(gl.getShaderInfoLog(sh)); return null; }
  return sh;
}

export function Wallpaper() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef  = useRef({
    mouse:       [0.5, 0.5] as [number, number],
    targetMouse: [0.5, 0.5] as [number, number],
    mvel:        [0,   0]   as [number, number],
    clicks:      Array.from({ length: 8 }, (): [number, number, number] => [0, 0, 99]),
    clickIdx: 0,
    t0: performance.now() / 1000,
  });

  useEffect(() => { window.__wp_state = stateRef.current; }, []);

  useEffect(() => {
    const onMove  = (e: PointerEvent) => { stateRef.current.targetMouse = [e.clientX / window.innerWidth, 1 - e.clientY / window.innerHeight]; };
    const onClick = (e: PointerEvent) => {
      const s = stateRef.current;
      s.clicks[s.clickIdx] = [e.clientX / window.innerWidth, 1 - e.clientY / window.innerHeight, 0];
      s.clickIdx = (s.clickIdx + 1) % 8;
    };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerdown', onClick);
    return () => { window.removeEventListener('pointermove', onMove); window.removeEventListener('pointerdown', onClick); };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const gl = (canvas.getContext('webgl', { antialias: false, alpha: false }) || canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null;
    if (!gl) return;

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);

    const vs = compile(gl, gl.VERTEX_SHADER,   VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER,  FRAG);
    if (!vs || !fs) return;
    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs); gl.attachShader(prog, fs); gl.linkProgram(prog);
    gl.useProgram(prog);

    const aPos = gl.getAttribLocation(prog, 'a_pos');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const loc = (n: string) => gl.getUniformLocation(prog, n);
    const locs = {
      u_res:       loc('u_res'),
      u_time:      loc('u_time'),
      u_mouse:     loc('u_mouse'),
      u_mvel:      loc('u_mvel'),
      u_clicks:    loc('u_clicks[0]'),
      u_speed:     loc('u_speed'),
      u_intensity: loc('u_intensity'),
      u_mstrength: loc('u_mstrength'),
      u_hue:       loc('u_hue'),
      u_grain:     loc('u_grain'),
    };

    const onResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      canvas.width  = Math.floor(window.innerWidth  * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    onResize();
    window.addEventListener('resize', onResize);

    let raf: number;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000); last = now;
      const s  = stateRef.current;
      const k  = 1 - Math.pow(0.001, dt);
      const nx = s.mouse[0] + (s.targetMouse[0] - s.mouse[0]) * k;
      const ny = s.mouse[1] + (s.targetMouse[1] - s.mouse[1]) * k;
      s.mvel  = [(nx - s.mouse[0]) / dt, (ny - s.mouse[1]) / dt];
      s.mouse = [nx, ny];
      for (const c of s.clicks) c[2] += dt;

      gl.useProgram(prog);
      gl.uniform2f(locs.u_res,   gl.canvas.width, gl.canvas.height);
      gl.uniform1f(locs.u_time,  performance.now() / 1000 - s.t0);
      gl.uniform2f(locs.u_mouse, s.mouse[0], s.mouse[1]);
      gl.uniform2f(locs.u_mvel,  s.mvel[0],  s.mvel[1]);
      const arr = new Float32Array(24);
      for (let i = 0; i < 8; i++) { arr[i*3]=s.clicks[i][0]; arr[i*3+1]=s.clicks[i][1]; arr[i*3+2]=s.clicks[i][2]; }
      gl.uniform3fv(locs.u_clicks, arr);
      gl.uniform1f(locs.u_speed,      0);
      gl.uniform1f(locs.u_intensity,  1.0);
      gl.uniform1f(locs.u_mstrength,  0.5);
      gl.uniform1f(locs.u_hue,        0);
      gl.uniform1f(locs.u_grain,      0);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', display: 'block', zIndex: 0, pointerEvents: 'none' }}
    />
  );
}
