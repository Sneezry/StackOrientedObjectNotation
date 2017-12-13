# Stack Object Notation

SON (Stack Object Notation) is a data-interchange format for communication between low-level programming languages and high-level programming languages. For low-level programming languages, SON is easy to parse by using stack. And for high-level programming languages, SON is easy to convert into JSON.

## Compare with JSON

| JSON | SON |
|:----:|:---:|
| `"Hello World"` | `"Hello World"` |
| `123` | `123` |
| `true` | `True` |
| `false` | `False` |
| `null` | `Null` |
| `["a", "b", 123]` | `"a" "b" 123 \A3` |
| `{"key1": "value1", "key2": "value2"}` | `"key1" "value1" "key2" "value2" \O2` |
| `{"key": ["value1", "value2"]}` | `"key" "value1" "value2" \A2 \O1` |
| `[{"key": "value1"}, {"key": "value2"}]` | `"key" "value1" \O1 "key" "value2" \O1 \A2` |