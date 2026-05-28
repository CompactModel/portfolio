# Instructions for Claude Code

## Autonomy Rules
- For simple tasks (fix a bug, change a style, edit one file): do it directly without asking.
- For complex tasks: write a short plan first, wait for my approval, then execute.
- Complex means: creating new files, installing packages, touching 3+ files at once.

## When Stuck
- If blocked for more than 2 attempts: stop and ask me one specific question.
- Do not retry the same approach more than twice.
- Do not re-read files you have already read in this session.

## When Fixing Bugs
- Read only the file I point you to.
- If you cannot find the problem there, ask me — do not search the whole project.
- Fix only the broken part. Do not clean up surrounding code.

## When Building UI
- Match the existing style of the project.
- Do not install new libraries unless I ask.
- If you need to make a decision (colors, layout, wording), make a reasonable choice and mention it briefly.

## General Rules
- Do only what I ask. Nothing more.
- Do not add features I did not request.
- Do not refactor code unrelated to the task.
- Keep changes minimal and focused.
