---
id: python-03
title: 🐍 03. Dictionaries
sidebar_position: 3
---

# 03. Dictionaries

<iframe
  src="https://www.youtube.com/embed/LTXnQdrwyrw"
  title="Dictionaries in Python - Advanced Python 03 - Programming Tutorial"
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
  className="video-holidays"
>
</iframe>

Original Link: [Advanced Python](https://www.python-engineer.com/courses/advancedpython/)

---

## 1. Overview of Python Dictionaries

A **dictionary** in Python is a collection of key-value pairs characterized by:

1. **Unordered** (though insertion-ordered in modern Python 3.7+).
2. **Changeable/Mutable**: You can add, remove, and modify key-value pairs after creating the dictionary.
3. **Indexed by keys**: Instead of accessing elements by numeric index (as in lists), you access values by using their corresponding keys.
4. **No duplicate keys**: Each key within a dictionary must be unique.

Dictionaries are written with curly braces `{}` containing comma-separated key-value pairs. Each pair is written as `key: value`.

---

## 2. Creating Dictionaries

You can create dictionaries in two primary ways:

### 2.1 Using Curly Braces

```python
my_dict = {"name": "Max", "age": 28, "city": "New York"}
print(my_dict)
# {'name': 'Max', 'age': 28, 'city': 'New York'}
```

### 2.2 Using the `dict()` Constructor

```python
my_dict_2 = dict(name="Lisa", age=27, city="Boston")
print(my_dict_2)
# {'name': 'Lisa', 'age': 27, 'city': 'Boston'}
```

Note that when using `dict()`, Python treats the parameters as key-value pairs (with the keys as valid identifiers, i.e., not requiring quotes).

---

## 3. Accessing Items

### 3.1 Access by Key

Use square brackets with the key name:

```python
name_in_dict = my_dict["name"]
print(name_in_dict)  # Max
```

If the key does not exist, Python raises a `KeyError`.

### 3.2 Using `get()`

If you prefer to avoid `KeyError` exceptions, use the dictionary’s `.get()` method, which returns `None` (or a specified default) if the key is not found:

```python
lastname = my_dict.get("lastname", "Unknown")
print(lastname)  # Unknown
```

---

## 4. Adding and Changing Items

To add or modify a key-value pair, assign a value to a key:

```python
# Add a new key-value pair
my_dict["email"] = "max@xyz.com"

# Modify an existing key’s value
my_dict["email"] = "coolmax@xyz.com"
```

If the key already exists, it will be **overwritten** with the new value.

---

## 5. Deleting Items

There are several ways to remove items from a dictionary:

1. **`del`** statement  
   ```python
   del my_dict["email"]  # removes the key-value pair for "email"
   ```

2. **`pop(key)`** method  
   - Removes the item with the specified key and returns the corresponding value.  
   ```python
   age_value = my_dict.pop("age")
   print("popped value:", age_value)
   ```

3. **`popitem()`** method  
   - Removes and returns the **last inserted** key-value pair (in Python 3.7+).  
   - In earlier versions of Python (before 3.7), it removes an arbitrary item.
   ```python
   popped_item = my_dict.popitem()
   print("popped item:", popped_item)
   ```

4. **`clear()`** method  
   - Removes **all** key-value pairs, leaving an empty dictionary.  
   ```python
   my_dict.clear()
   ```

---

## 6. Checking for Keys

1. **Using `in`**  
   ```python
   if "name" in my_dict:
       print(my_dict["name"])
   ```
2. **Using `try`/`except KeyError`**  
   ```python
   try:
       print(my_dict["firstname"])
   except KeyError:
       print("No key found")
   ```

---

## 7. Looping Through Dictionaries

You can iterate through dictionaries in several ways:

1. **Loop over keys**  
   ```python
   for key in my_dict:
       print(key, my_dict[key])
   ```
   or explicitly:
   ```python
   for key in my_dict.keys():
       print(key)
   ```

2. **Loop over values**  
   ```python
   for value in my_dict.values():
       print(value)
   ```

3. **Loop over keys and values**  
   ```python
   for key, value in my_dict.items():
       print(key, value)
   ```

---

## 8. Copying Dictionaries

Be careful when copying references in Python. Assigning one dictionary variable to another **does not** create an independent copy; it only copies the reference:

```python
dict_org = {"name": "Max", "age": 28, "city": "New York"}
dict_copy = dict_org  # references the same dictionary object in memory

dict_copy["name"] = "Lisa"
print(dict_copy)  # {'name': 'Lisa', 'age': 28, 'city': 'New York'}
print(dict_org)   # {'name': 'Lisa', 'age': 28, 'city': 'New York'} <- also changed
```

To create a **real copy**, use one of the following:

1. **`copy()` method**  
   ```python
   dict_copy = dict_org.copy()
   ```

2. **`dict()` constructor**  
   ```python
   dict_copy = dict(dict_org)
   ```

:::warning[Warning!]

These methods create a **shallow copy**, meaning **nested** structures are still referenced.

To create a copy that is **not** shallow—i.e., a copy where **all** nested structures are recursively duplicated rather than merely referenced—you need a **deep copy**. In Python, this is done using the `copy.deepcopy()` function from the built-in `copy` module:

```python
import copy

original_dict = {"name": "Max", "hobbies": ["football", "chess"]}
deep_copied_dict = copy.deepcopy(original_dict)

# Now modifying a nested element in deep_copied_dict will not affect original_dict.
deep_copied_dict["hobbies"].append("coding")

print(original_dict)      # {'name': 'Max', 'hobbies': ['football', 'chess']}
print(deep_copied_dict)   # {'name': 'Max', 'hobbies': ['football', 'chess', 'coding']}
```

Here, `deepcopy` recursively copies all levels of nested data structures so that changes in the copy will not affect the original.

:::

---

## 9. Merging Dictionaries

### 9.1 Using `update()`

You can merge two dictionaries using the `.update()` method. Existing keys are overwritten, and new keys are added.

```python
my_dict = {"name": "Max", "age": 28, "email": "max@xyz.com"}
my_dict_2 = dict(name="Lisa", age=27, city="Boston")

my_dict.update(my_dict_2)
print(my_dict)
# {'name': 'Lisa', 'age': 27, 'email': 'max@xyz.com', 'city': 'Boston'}
```

### 9.2 Using Dictionary Unpacking (Python 3.9+)

You can also merge dictionaries with a “union” operator `|` (introduced in Python 3.9):

```python
merged_dict = my_dict | my_dict_2
```

---

## 10. Possible Key Types

Dictionary keys must be **immutable**. Common immutable types include:

- **Strings**: `{"name": "Max"}`
- **Numbers**: `{3: 9, 6: 36}`
- **Tuples** (if they contain only immutable elements): `my_dict = { (8, 7): 15 }`

Lists (or other mutable types) **cannot** be used as dictionary keys because they are not hashable:

```python
# This will raise a TypeError:
# my_list = [8, 7]
# my_dict = {my_list: 15}
```

:::info[Hashable Objects]

In Python, an object is **hashable** if it has a **fixed hash value** throughout its lifetime (i.e., it does not change after the object is created) and can be compared to other objects in a way that is consistent with its hash value. Formally, this means the object must:

1. Implement a `__hash__()` method that returns an integer (its hash value).
2. Implement an equality method (`__eq__`) that is consistent with the hash value:  
   - If two objects compare equal, they must have the **same** hash value.

Hashable objects include most **immutable** built-in objects like *integers*, *floats*, *strings*, and *tuples* containing only immutable types. Because their value cannot change after creation, their hash remains constant. By contrast, **mutable** types (like *lists*, *dictionaries* themselves, or *sets*) are not hashable, because their contents (and thus their would-be hash) can change over time. This requirement exists so that keys in dictionaries (and elements of sets) remain valid as the underlying data structure uses the hash value for fast lookups.

:::

---

## 11. Nested Dictionaries

Values in a dictionary can be **any** Python object, including lists, tuples, or even other dictionaries.

```python
my_dict_1 = {"name": "Max", "age": 28}
my_dict_2 = {"name": "Alex", "age": 25}
nested_dict = {"dictA": my_dict_1, "dictB": my_dict_2}
print(nested_dict)
# {'dictA': {'name': 'Max', 'age': 28}, 'dictB': {'name': 'Alex', 'age': 25}}
```

---

## 12. Other Useful Dictionary Methods

1. **`get(key, default=None)`**  
   - Returns the value for `key` if present, otherwise returns `default`.  
   - Helpful to avoid `KeyError`.

2. **`setdefault(key, default=None)`**  
   - Returns the value of `key` if in the dictionary; otherwise, inserts `key` with a value of `default`.

3. **`items()`**  
   - Returns a view object of key-value pairs.

4. **`keys()`**  
   - Returns a view object of keys.

5. **`values()`**  
   - Returns a view object of values.

---

## 13. Dictionary Comprehensions

Like list comprehensions, you can create dictionaries using **dictionary comprehensions**:

```python
squares = {x: x*x for x in range(1, 6)}
print(squares)
# {1: 1, 2: 4, 3: 9, 4: 16, 5: 25}
```

This is a concise way to create dictionaries without needing an explicit loop and assignment.

---

## 14. Ordered or Unordered?

- In **Python 3.7+**, the insertion order of dictionary keys is preserved as an implementation detail, and in **Python 3.8+** it is officially a language feature.
- In **older versions** (prior to 3.7), dictionaries were generally considered unordered, so you could not rely on the insertion order.

However, even though Python now preserves insertion order, dictionaries are typically **conceptually** considered **unordered** collections, meaning you focus on the mapping rather than positional indices.

---

## 15. Summary

**Dictionaries** in Python are powerful, flexible data structures for mapping **keys** to **values**. They are mutable, support dynamic addition and removal of items, and allow any immutable type (strings, numbers, tuples of immutables) to serve as keys. The ability to nest dictionaries, along with the variety of built-in methods (`update()`, `items()`, `pop()`, etc.), makes them a go-to choice for representing complex data structures. They are essential for many scenarios, including fast lookups by key and the representation of structured data where each value must be accessed by a meaningful identifier rather than a numeric index.