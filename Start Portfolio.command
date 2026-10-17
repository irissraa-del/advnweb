#!/bin/zsh
cd -- "$(dirname -- "$0")"
printf '\nOpen http://localhost:4178 in your browser.\nPress Control-C to stop.\n\n'
python3 -m http.server 4178 --bind 127.0.0.1 --directory dist
