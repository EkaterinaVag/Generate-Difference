### Hexlet tests and linter status:
[![Actions Status](https://github.com/EkaterinaVag/frontend-project-46/workflows/hexlet-check/badge.svg)](https://github.com/EkaterinaVag/frontend-project-46/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/2cb9cf53b18c47db3a36/maintainability)](https://codeclimate.com/github/EkaterinaVag/frontend-project-46/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/2cb9cf53b18c47db3a36/test_coverage)](https://codeclimate.com/github/EkaterinaVag/frontend-project-46/test_coverage)
[![Github Actions](https://github.com/EkaterinaVag/frontend-project-46/actions/workflows/github-actions.yml/badge.svg)](https://github.com/EkaterinaVag/frontend-project-46/actions/workflows/github-actions.yml)

# Generate Difference
Generate Difference is a cli-utility that compares two files and shows the difference.
Supports formats: yaml, json.
Generating a report in the form of plain text, stylish and json.

## Installation
Prerequisites: Node.js 
```

 git clone https://github.com/EkaterinaVag/frontend-project-46.git

 cd frontend-project-46

 make install

 npm link
```

**For start to run:**
```

gendiff --format [option] <path to first file> <path to second file2>
```

## Examples of using
## Output usage information
```

gendiff -h
```
[![asciicast](https://asciinema.org/a/j6PZFYNGTxSXDByiHbPeXT5J4.svg)](https://asciinema.org/a/j6PZFYNGTxSXDByiHbPeXT5J4)

## Compare two JSON files. Stylish format output
[![asciicast](https://asciinema.org/a/uJZtcvj5kEB7KBSwj8tqjVlFk.svg)](https://asciinema.org/a/uJZtcvj5kEB7KBSwj8tqjVlFk)

## Compare two YAML files. Stylish format output
[![asciicast](https://asciinema.org/a/bGDGxV4K9ftx93rQrqQsLcLmp.svg)](https://asciinema.org/a/bGDGxV4K9ftx93rQrqQsLcLmp)

## Compare two files. Plain format output
[![asciicast](https://asciinema.org/a/YGdwbdO8zgZWQs3C9IRnJxNNp.svg)](https://asciinema.org/a/YGdwbdO8zgZWQs3C9IRnJxNNp)

## Compare two files. JSON format output
[![asciicast](https://asciinema.org/a/zc8ZbuBz4zPcB66vSEUsKKI4t.svg)](https://asciinema.org/a/zc8ZbuBz4zPcB66vSEUsKKI4t)