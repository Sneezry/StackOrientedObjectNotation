# Stack Oriented Object Notation

SOON (Stack Oriented Object Notation) is a data-interchange format. It is easy for low-level programming langage to parse, and easy to convert from JSON.

## Online Playground

<https://output.jsbin.com/fohosabifa>

## Structure

Similar with JSON, SOON is built on two commands:

* A collection of name/value pairs (Object).
* An ordered list of values (Array).

### Dictionary

```
value1 key1 value2 key2 ... value<n> key<n> O<n>
```

The O command stands for Object.

### Array

```
value1 value2 ... value<n> A<n>
```

The A command stands for Array.

### String, Number, Boolean and Null

Same as JSON, single string, number, boolean and null are valid SOON.

```
"Hello World"
123
True
False
Null
```

## Compare with JSON

| JSON | SOON |
|:----:|:---:|
| `"Hello World"` | `"Hello World"` |
| `123` | `123` |
| `true` | `True` |
| `false` | `False` |
| `null` | `Null` |
| `["a", "b", 123]` | `"a" "b" 123 A3` |
| `{"key1": "value1", "key2": "value2"}` | `"value1" "key1" "value2" "key2" O2` |
| `{"key": ["value1", "value2"]}` | `"value1" "value2" A2 "key" O1` |
| `[{"key": "value1"}, {"key": "value2"}]` | `"value1" "key" O1 "value2" "key" O1 A2` |