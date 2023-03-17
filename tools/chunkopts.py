#!/usr/bin/env python3
"""
"""
import logging
import re
from pathlib import Path

from wtl import cli

_log = logging.getLogger(__name__)


def main():
    parser = cli.ArgumentParser()
    parser.add_argument("infile", nargs="*", type=Path)
    args = parser.parse_args()
    for infile in args.infile:
        with open(infile) as fin:
            lines = [sub(line.rstrip()) for line in fin]
        if not cli.dry_run:
            with open(infile, "w") as fout:
                fout.write("\n".join(lines))


def sub(line: str):
    if mobj := re.match(r"^```{r[, ]+([^ ,]+)[ ,]*(.*)}$", line):
        _log.debug(line)
        if (new := repl(mobj)) != line:
            _log.info(f"\033[31m{line}\033[0m")
            _log.info(f"\033[32m{new}\033[0m")
        return new
    else:
        return line


def repl(mobj: re.Match[str]):
    label = mobj.group(1)
    if "_" in label or "." in label:
        _log.warning(f"chunk label with . or _: {label}")
    options = to_yaml(mobj.group(2))
    return f"```{{r, {label}}}{options}"


def to_yaml(comma_sep_r: str):
    yaml = re.sub(r"([\w.]+) *= *", r"\n#| \1: ", comma_sep_r)
    yaml = re.sub(r", *$", "", yaml, flags=re.M)
    yaml = re.sub(r": (FALSE|TRUE)", lambda m: m.group(0).lower(), yaml)
    yaml = re.sub(r"(?<=: )(-?\d+)L", r"\1", yaml)
    yaml = add_expr(yaml)
    return yaml


def add_expr(yaml: str):
    patt = re.compile(r"#\| ([^:]+): *(.+)$", re.M)
    lines: list[str] = []
    for key, value in patt.findall(yaml):
        if "(" in value or value == "NA":
            lines.append(f"\n#| {key}: !expr '{value}'")
        else:
            lines.append(f"\n#| {key}: {value}")
    return "".join(lines)


if __name__ == "__main__":
    main()
