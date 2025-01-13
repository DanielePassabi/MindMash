---
id: python-05
title: 🐍 05. Strings
sidebar_position: 6
---

# 05. Strings

<iframe
  src="https://www.youtube.com/embed/e6ivlABOYRI"
  title="Strings in Python - Advanced Python 05 - Programming Tutorial"
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
  className="video-holidays"
>
</iframe>

Original Link: [Advanced Python](https://www.python-engineer.com/courses/advancedpython/)

---

## 1. Overview of Python Strings

A **string** in Python is a **sequence of characters**. Python uses **Unicode** internally to represent characters, which means it supports a wide range of languages and symbols.

- **String literals** can be enclosed in either **single quotes** (`' '`) or **double quotes** (`" "`).
- **Strings are immutable**: Once created, they cannot be changed in place. Operations that appear to modify a string actually create a new one.

---

## 2. Creating Strings

### 2.1 Single or Double Quotes

```python
my_string = 'Hello'
my_string = "Hello"
```
Both are valid; the choice typically depends on readability or the need to include quotes inside the string.

### 2.2 Escaping Characters

Use the backslash to escape quotes or special characters:
```python
my_string = 'I\' m a "Geek"'
my_string = "I\' m a \'Geek\'"
print(my_string)
# I' m a 'Geek'
```

### 2.3 Triple Quotes for Multiline Strings

Triple-quoted strings (`""" """` or `''' '''`) can span multiple lines:
```python
my_string = """Hello
World"""
print(my_string)
# Hello
# World
```

### 2.4 Line Continuation with a Backslash

```python
my_string = "Hello \
World"
print(my_string)
# Hello World
```

---

## 3. Accessing Characters and Substrings

Use **indexing** to access characters in a string, or **slicing** to access substrings:

```python
my_string = "Hello World"
char_0 = my_string[0]        # 'H'
sub_1_3 = my_string[1:3]     # 'el' (indices 1,2)
sub_start = my_string[:5]    # 'Hello'
sub_end = my_string[6:]      # 'World'
step2 = my_string[::2]       # 'HloWrd' (every 2nd char)
reverse = my_string[::-1]    # 'dlroW olleH'
```
**Note**: Python uses zero-based indexing, and the **end index** in a slice is exclusive (not included).

---

## 4. String Concatenation

Strings can be concatenated with the **`+`** operator:
```python
greeting = "Hello"
name = "Tom"
sentence = greeting + " " + name
print(sentence)  # Hello Tom
```
However, repeated concatenation using `+` in a loop can be inefficient; see the [Immutability and Performance](#9-more-on-immutability-and-performance) section for best practices.

---

## 5. Iterating Over a String

Strings are iterable sequences, so you can use a `for` loop:
```python
my_string = "Hello"
for char in my_string:
    print(char)
```

---

## 6. Checking Membership

Check if a character or substring is in a string using the **`in`** keyword:
```python
if "e" in "Hello":
    print("yes")
if "llo" in "Hello":
    print("yes")
# yes
# yes
```

---

## 7. Useful String Methods

Below are some of the most common built-in string methods:

```python
my_string = "     Hello World "
my_string = my_string.strip()  # remove leading and trailing whitespaces
print(my_string)               # "Hello World"
print(len(my_string))          # number of characters -> 11

print(my_string.upper())       # "HELLO WORLD"
print(my_string.lower())       # "hello world"

print("hello".startswith("he"))  # True
print("hello".endswith("llo"))   # True

print("Hello".find("o"))       # first index of 'o', or -1 if not found -> 4
print("Hello".count("e"))      # count occurrences of 'e' -> 1

# replace occurrences of a substring (returns a new string)
message = "Hello World"
new_message = message.replace("World", "Universe")
print(new_message)             # "Hello Universe"

# splitting and joining
my_string = "how are you doing"
split_list = my_string.split() # split by whitespace -> ['how', 'are', 'you', 'doing']
my_string2 = "one,two,three"
split_list2 = my_string2.split(",") # ['one', 'two', 'three']

my_list = ["How", "are", "you", "doing"]
joined_str = " ".join(my_list)  # "How are you doing"
```

---

## 8. String Formatting

### 8.1 `.format()` Method

Use braces `{}` as placeholders:
```python
a = "Hello {0} and {1}".format("Bob", "Tom")
# "Hello Bob and Tom"

a = "The integer value is {}".format(2)
# "The integer value is 2"

a = "The float value is {0:.3f}".format(2.1234)
# "The float value is 2.123"
```
You can specify formatting codes (like `.3f` for floats or `:b` for binary).

### 8.2 Old Style (`%` Operator)

```python
print("Hello %s and %s" % ("Bob", "Tom"))
val = 3.14159265359
print("The decimal value is %d" % val)   # 3.14159265359 -> 3
print("The float value is %.2f" % val)   # 3.14
```

### 8.3 f-Strings (Python 3.6+)

f-Strings provide a concise syntax:
```python
name = "Eric"
age = 25
print(f"Hello, {name}. You are {age}.")
# Hello, Eric. You are 25.

pi = 3.14159
print(f"Pi is {pi:.3f}")
# Pi is 3.142

print(f"The value is {2 * 60}")
# The value is 120
```
They allow direct expressions inside the braces.

---

## 9. More on Immutability and Performance

Because strings in Python are **immutable**, concatenating large numbers of strings with `+` repeatedly can be inefficient. Each concatenation creates a new string in memory.

**Example**:
```python
# Inefficient approach
from timeit import default_timer as timer
my_list = ["a"] * 1000000

start = timer()
result_str = ""
for char in my_list:
    result_str += char
end = timer()
print("Concatenate with +:", end - start, "seconds")

# Efficient approach
start = timer()
result_str = "".join(my_list)
end = timer()
print("Concatenate with join():", end - start, "seconds")

# On i7-14700KF
# Concatenate with +: 7.389741700000741 seconds
# Concatenate with join(): 0.0029293999996298226 seconds
```

Using `"".join(...)` is much faster and more memory-friendly for large-scale concatenations.

---

## 10. Common String Use Cases

1. **User Messages / UI**  
   - Displaying messages, prompts, or logs in a user interface.

2. **Data Parsing and Manipulation**  
   - Splitting, joining, or searching within strings (e.g., reading CSV data).

3. **Building File Paths, URLs**  
   - Constructing dynamic paths or URLs through string concatenation and formatting.

4. **Template Rendering**  
   - Creating dynamic content in templates (often used in web frameworks).

5. **Text Processing**  
   - Pattern matching, data cleaning, and analysis (with or without `re`—the regular expressions library).

---

## Conclusion

Python **strings** are versatile, immutable sequences of Unicode characters that form the backbone of text processing. From simple output to complex data parsing, strings lie at the heart of most Python applications. Their immutability ensures reliability in multi-step operations, while a rich set of built-in methods (for splitting, joining, searching, and formatting) covers the majority of common use cases.  

Remember to use **f-strings** (Python 3.6+) for elegant and efficient formatting, and switch to `join()` when building large strings repeatedly to avoid the performance pitfalls of repeated concatenation.