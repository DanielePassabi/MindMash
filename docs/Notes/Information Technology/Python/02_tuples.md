---
id: python-02
title: 🐍 02. Tuples
sidebar_position: 2
---

# 02. Tuples

<iframe
  src="https://www.youtube.com/embed/Kes8YRV73Io"
  title="Tuples in Python - Advanced Python 02 - Programming Tutorial"
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
  className="video-holidays"
>
</iframe>

Original Link: [Advanced Python](https://www.python-engineer.com/courses/advancedpython/)

---

## 1. Overview of Python Tuples

A **tuple** is a built-in collection data type in Python with the following characteristics:

1. **Ordered**: The items have a defined sequence that does not change.  
2. **Immutable**: You cannot add, remove, or modify items once the tuple is created.  
3. **Allows duplicates**: Tuples may contain duplicate elements, just like lists.

Tuples are typically used to group elements that logically belong together, especially when those elements should not (or will not) change over the lifetime of the program.

---

## 2. Reasons to Use a Tuple Over a List

- **Logical grouping**: Tuples can be used to group heterogeneous (different) data types that logically belong together (e.g., person information like name, age, city).  
- **Immutability**:  
  - Provides a degree of “write-protection” for the data.  
  - Can lead to performance and memory optimizations.  
  - Tuples can be used as dictionary keys or elements of sets, because they are hashable (immutable). Lists cannot be used in these situations.  
- **Slight Performance Benefit**: Iterating through a tuple can be slightly faster than iterating through a list (due to immutability and Python’s internal optimizations).

---

## 3. Creating Tuples

Tuples are typically created using parentheses `(` `)`, separated by commas. Parentheses can be optional in many cases, but using them improves readability.

```python
tuple_1 = ("Max", 28, "New York")
tuple_2 = "Linda", 25, "Miami"  # parentheses are optional
```

### 3.1 Single-Element Tuples

A single-element tuple requires a trailing comma. Otherwise, Python will interpret it as a different object type (e.g., an integer in parentheses).

```python
tuple_3 = (25,)  # single-element tuple
print(tuple_3)   # (25,)
```

### 3.2 Using the `tuple()` Constructor

You can convert other iterable types (lists, dictionaries, strings, etc.) to a tuple using the `tuple()` constructor.

```python
tuple_4 = tuple([1, 2, 3])  
print(tuple_4)   # (1, 2, 3)
```

---

## 4. Accessing Tuple Elements

Tuples are zero-indexed, meaning the first element is at index 0.

```python
tuple_1 = ("Max", 28, "New York")
item = tuple_1[0]
print(item)  # Max
```

### 4.1 Negative Indexing

Just like lists, Python allows negative indices for tuples.

```python
item = tuple_1[-1]
print(item)  # New York
```

---

## 5. Immutability: No Changes After Creation

Tuples are **immutable**; you cannot add or remove items or reassign an item after the tuple is created. Doing so raises a `TypeError`:

```python
tuple_1 = ("Max", 28, "New York")
tuple_1[2] = "Boston"  # ❌ Not allowed
```

Similarly, you cannot append to or remove elements from a tuple.

---

## 6. Deleting a Tuple

While you cannot delete individual items from a tuple, you can delete the entire tuple object.

```python
tuple_2 = ("Linda", 25, "Miami")
del tuple_2  # the entire tuple is deleted
```

---

## 7. Iterating Over Tuples

You can iterate over tuples using a `for` loop, just as you would with lists.

```python
tuple_1 = ("Max", 28, "New York")
for item in tuple_1:
    print(item)
# Max
# 28
# New York
```

---

## 8. Checking for Existence of an Item

To check whether an element is present in a tuple, use the `in` keyword:

```python
if "New York" in tuple_1:
    print("yes")
else:
    print("no")
# yes
```

---

## 9. Useful Tuple Methods

### 9.1 `len()`

Returns the number of elements in a tuple.

```python
my_tuple = ('a','p','p','l','e')
print(len(my_tuple))  # 5
```

### 9.2 `count(x)`

Returns the number of times `x` appears in the tuple.

```python
print(my_tuple.count('p'))  # 2
```

### 9.3 `index(x)`

Returns the index of the first occurrence of `x`.

```python
print(my_tuple.index('l'))  # 3
```

### 9.4 Repetition

You can repeat a tuple multiple times using the `*` operator.

```python
my_tuple = ('a', 'b') * 5
print(my_tuple)
# ('a', 'b', 'a', 'b', 'a', 'b', 'a', 'b', 'a', 'b')
```

### 9.5 Concatenation

Tuples can be concatenated using the `+` operator.

```python
my_tuple = (1,2,3) + (4,5,6)
print(my_tuple)
# (1, 2, 3, 4, 5, 6)
```

### 9.6 Converting Between Tuples and Lists

```python
my_list = ['a', 'b', 'c', 'd']
list_to_tuple = tuple(my_list)
print(list_to_tuple)  # ('a', 'b', 'c', 'd')

tuple_to_list = list(list_to_tuple)
print(tuple_to_list)  # ['a', 'b', 'c', 'd']
```

### 9.7 Converting Strings to Tuples

```python
string_to_tuple = tuple("Hello")
print(string_to_tuple)  # ('H', 'e', 'l', 'l', 'o')
```

---

## 10. Slicing Tuples

Like lists and strings, you can slice tuples to extract sub-parts using `[start:stop:step]`.

```python
a = (1, 2, 3, 4, 5, 6, 7, 8, 9, 10)

b = a[1:3]    # from index 1 up to (but not including) 3
print(b)      # (2, 3)

b = a[2:]     # from index 2 to the end
print(b)      # (3, 4, 5, 6, 7, 8, 9, 10)

b = a[:3]     # from beginning up to (not including) index 3
print(b)      # (1, 2, 3)

b = a[::2]    # from start to end, step by 2
print(b)      # (1, 3, 5, 7, 9)

b = a[::-1]   # reverse the tuple
print(b)      # (10, 9, 8, 7, 6, 5, 4, 3, 2, 1)
```

---

## 11. Unpacking Tuples

You can unpack tuple elements into individual variables:

```python
tuple_1 = ("Max", 28, "New York")
name, age, city = tuple_1
print(name)  # Max
print(age)   # 28
print(city)  # New York
```

### 11.1 Using the Asterisk (`*`) to Unpack Multiple Elements

If you don’t know (or don’t need) all elements, you can gather them into a list using `*`.

```python
my_tuple = (0, 1, 2, 3, 4, 5)
item_first, *items_between, item_last = my_tuple
print(item_first)     # 0
print(items_between)  # [1, 2, 3, 4]
print(item_last)      # 5
```

---

## 12. Nested Tuples

Tuples can contain other tuples (or any other Python objects), forming nested structures:

```python
a = ((0, 1), ('age', 'height'))
print(a)        # ((0, 1), ('age', 'height'))
print(a[0])     # (0, 1)
```

---

## 13. Comparing Tuples and Lists

- **Memory Usage**: Tuples can use slightly less memory than lists with the same number of items, due to their immutability.  
- **Performance**: Creating or iterating over a tuple can be slightly faster than a list.

```python
import sys
my_list = [0, 1, 2, "hello", True]
my_tuple = (0, 1, 2, "hello", True)

print(sys.getsizeof(my_list), "bytes")
print(sys.getsizeof(my_tuple), "bytes")
# e.g. 104 bytes (list)
#      88 bytes (tuple)
```

You can also compare creation times using `timeit`:

```python
import timeit

print(timeit.timeit(stmt="[0, 1, 2, 3, 4, 5]", number=1000000))
print(timeit.timeit(stmt="(0, 1, 2, 3, 4, 5)", number=1000000))
```

Tuples are often faster to create, reflecting their immutability and simpler internal structure.

---

## 14. Summary

**Tuples** in Python are **ordered** and **immutable** collections. They are extremely useful for grouping data that should not change throughout the lifecycle of a program. Their immutability allows Python to make optimizations that can result in better performance and memory usage compared to lists. They can also serve as valid dictionary keys (or set elements) because they are hashable, whereas lists cannot.  

When to use a tuple vs. a list often comes down to intent:  
- Use a **tuple** when you have data that is logically grouped and should not change.  
- Use a **list** when the data might need to be modified, reordered, or extended over time.

By understanding these characteristics, you can make better design choices and take full advantage of Python’s data structures in your projects.