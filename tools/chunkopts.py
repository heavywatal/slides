"""Transform chunk options to yaml and check name duplication."""
import logging
import re
from pathlib import Path

from wtl import cli

_log = logging.getLogger(__name__)
used: set[str] = set()


def main():
    parser = cli.ArgumentParser()
    parser.add_argument("infile", nargs="*", type=Path)
    args = parser.parse_args()
    log_name = _log.name.removeprefix("__main_")
    for infile in args.infile:
        _log.name = f"{log_name}.{infile.name}"
        with infile.open() as fin:
            lines = [sub(line.rstrip(), i) for i, line in enumerate(fin)]
        if not cli.dry_run:
            with infile.open("w") as fout:
                fout.write("\n".join(lines))
                fout.write("\n")


def sub(line: str, i: int):
    if mobj := re.match(r"^```{(\w+)[, ]*([^,]*)[, ]*(.*)}$", line):
        if (new := repl(mobj, i)) != line:
            print(f"\033[31m{line}\033[0m")
            print(f"\033[32m{new}\033[0m")
        else:
            _log.info(line)
        return new
    return line


def repl(mobj: re.Match[str], i: int):
    header = mobj.group(1).lower()
    label = mobj.group(2)
    options = mobj.group(3)
    if "=" in label:
        options = (label + ", " + options).strip(", ")
        label = ""
    elif re.search(r"[^a-zA-Z0-9-]", label):
        _log.warning(f"{i}:use-hyphen: {label}")
    if label:
        if label in used:
            threshold = 10
            if label.startswith("setup-") and i < threshold:
                _log.info(f"{i}:duplicated: {label}")
            else:
                _log.warning(f"{i}:duplicated: {label}")
        else:
            used.add(label)
        header += f", {label}"
    else:
        _log.warning(f"{i}:unnamed: {mobj.group(0)}")
    options = to_yaml(options)
    return f"```{{{header}}}{options}"


def to_yaml(comma_sep_r: str):
    yaml = re.sub(r"[, ]*([\w.]+) *= *", r"\n#| \1: ", comma_sep_r)
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
