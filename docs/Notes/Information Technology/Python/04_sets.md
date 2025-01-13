---
id: python-04
title: 🐍 04. Sets
sidebar_position: 4
---

# 04. Sets

<iframe
  src="https://www.youtube.com/embed/Qs3BSFZnZSI"
  title="Sets in Python - Advanced Python 04 - Programming Tutorial"
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
  className="video-holidays"
>
</iframe>

Original Link: [Advanced Python](https://www.python-engineer.com/courses/advancedpython/)

---

## 1. Overview of Python Sets

A **set** in Python is:

1. **Unordered**: The items have no defined order, so you cannot rely on a specific ordering of elements.
2. **Unindexed**: There are no numeric indexes for set elements (unlike lists). You access items by value rather than by position.
3. **Mutable**: You can add or remove elements after the set is created.
4. **No duplicates**: Each element in a set is unique. If you add an element that already exists, it will have no effect.

Sets are typically used to perform membership tests (check if an item is in a set) and perform set operations like union, intersection, and difference—often for tasks like deduplication or mathematical set algebra.

---

## 2. Creating Sets

There are two primary ways to create a set:

### 2.1 Using Curly Braces

```python
my_set = {"apple", "banana", "cherry"}
print(my_set)
# Example output (order may vary): {'banana', 'apple', 'cherry'}
```

### 2.2 Using the `set()` Constructor

You can also create a set from any **iterable**, such as a list, tuple, or string:

```python
my_set_2 = set(["one", "two", "three"])
my_set_3 = set(("one", "two", "three"))
print(my_set_2)  # {'three', 'one', 'two'}

my_set_4 = set("aaabbbcccdddeeeeeffff")
print(my_set_4)  # {'b', 'c', 'd', 'e', 'f', 'a'}
```

**Important**: Creating an empty set cannot be done with `{}`, since `{}` creates an empty dictionary. Instead:

```python
a = set()  # creates an empty set
```

---

## 3. Adding Elements

Use the `add()` method to add elements to an existing set:

```python
my_set = set()
my_set.add(42)
my_set.add(True)
my_set.add("Hello")
print(my_set)
# Example output: {True, 42, 'Hello'}

# If an element already exists, adding it again has no effect
my_set.add(42)
print(my_set)  # unchanged
```

---

## 4. Removing Elements

Several methods are available to remove elements:

1. **`remove(x)`**  
   - Removes `x` from the set; raises a `KeyError` if `x` is not present.

   ```python
   my_set = {"apple", "banana", "cherry"}
   my_set.remove("apple")
   print(my_set)  # {'banana', 'cherry'}
   ```
   ```python
   # my_set.remove("orange")  # KeyError if "orange" is not in the set
   ```

2. **`discard(x)`**  
   - Removes `x` from the set if present; does **nothing** if `x` is not in the set.

   ```python
   my_set.discard("cherry")
   my_set.discard("blueberry")  # does nothing
   print(my_set)
   ```

3. **`pop()`**  
   - Removes **and returns** a random element (in practice, it removes an arbitrary element, but “random” is not guaranteed).

   ```python
   a = {True, 2, False, "hi", "hello"}
   popped = a.pop()  
   print(popped)  # e.g., could be 'hi' or any other element
   print(a)       # the remaining elements
   ```

4. **`clear()`**  
   - Removes **all** elements from the set, leaving it empty.

   ```python
   my_set.clear()
   print(my_set)  # set()
   ```

---

## 5. Checking Membership

Checking if an element exists in a set is usually O(1) on average:

```python
my_set = {"apple", "banana", "cherry"}
if "apple" in my_set:
    print("yes")  # yes
```

---

## 6. Iterating Over a Set

You can iterate over a set using a `for` loop. The order is not guaranteed:

```python
my_set = {"apple", "banana", "cherry"}
for item in my_set:
    print(item)
# Output could be in any order, e.g.:
# banana
# apple
# cherry
```

---

## 7. Set Operations: Union and Intersection

### 7.1 Union

Combines elements from both sets, removing duplicates.  
- **Method**: `A.union(B)` or `A | B`  
- This operation does not modify the original sets unless you use an “update” version of the method.

```python
odds = {1, 3, 5, 7, 9}
evens = {0, 2, 4, 6, 8}

u = odds.union(evens)  # or odds | evens
print(u)               # {0, 1, 2, 3, 4, 5, 6, 7, 8, 9}
```

### 7.2 Intersection

Takes the elements common to both sets.  
- **Method**: `A.intersection(B)` or `A & B`

```python
primes = {2, 3, 5, 7}
i = odds.intersection(primes)  # or odds & primes
print(i)  # {3, 5, 7}
```

---

## 8. Difference of Sets

- **`A.difference(B)`** or **`A - B`**: Elements in A but not in B.  
- **`B.difference(A)`** or **`B - A`**: Elements in B but not in A.  
- **`A.symmetric_difference(B)`** or **`A ^ B`**: Elements in either A or B but not in both.

```python
setA = {1, 2, 3, 4, 5, 6, 7, 8, 9}
setB = {1, 2, 3, 10, 11, 12}

diff = setA.difference(setB)  
print(diff)  # {4, 5, 6, 7, 8, 9}

diff_sym = setA.symmetric_difference(setB)
print(diff_sym)  # {4, 5, 6, 7, 8, 9, 10, 11, 12}
```

---

## 9. Updating Sets In-place

Instead of returning a new set, you can update an existing set:

1. **`setA.update(setB)`**: Add elements from `setB` to `setA`.  
2. **`setA.intersection_update(setB)`**: Keep only elements found in both `setA` and `setB`.  
3. **`setA.difference_update(setB)`**: Remove elements found in `setB` from `setA`.  
4. **`setA.symmetric_difference_update(setB)`**: Keep only elements found in either `setA` or `setB` but not both.

Example:

```python
setA = {1, 2, 3, 4, 5}
setB = {3, 4, 5, 6, 7}

setA.update(setB)
print(setA)  # {1, 2, 3, 4, 5, 6, 7}
```

---

## 10. Copying Sets

Be mindful of reference copying:

```python
set_org = {1, 2, 3, 4, 5}
set_copy = set_org  # both refer to the same set

set_copy.update([6, 7])
print(set_copy)  # {1, 2, 3, 4, 5, 6, 7}
print(set_org)   # {1, 2, 3, 4, 5, 6, 7}  <- also changed
```

To create an actual copy, use `copy()`:

```python
set_org = {1, 2, 3, 4, 5}
set_copy = set_org.copy()
set_copy.update([6, 7])
print(set_copy)  # {1, 2, 3, 4, 5, 6, 7}
print(set_org)   # {1, 2, 3, 4, 5}
```

---

## 11. Subset, Superset, and Disjoint

- **`A.issubset(B)`**: True if every element of A is in B. Also `A <= B`.  
- **`A.issuperset(B)`**: True if every element of B is in A. Also `A >= B`.  
- **`A.isdisjoint(B)`**: True if A and B share no common elements.

```python
setA = {1, 2, 3, 4, 5, 6}
setB = {1, 2, 3}

print(setA.issubset(setB))    # False
print(setB.issubset(setA))    # True

print(setA.issuperset(setB))  # True
print(setB.issuperset(setA))  # False

setC = {7, 8, 9}
print(setA.isdisjoint(setB))  # False
print(setA.isdisjoint(setC))  # True
```

---

## 12. Frozenset

A **frozenset** is an **immutable** version of a set. Once created, you cannot add, remove, or modify elements.

```python
a = frozenset([0, 1, 2, 3, 4])
# a.add(5)        # not allowed
# a.remove(1)     # not allowed

odds = frozenset({1, 3, 5, 7, 9})
evens = frozenset({0, 2, 4, 6, 8})
print(odds.union(evens))          # frozenset({0, 1, 2, 3, 4, 5, 6, 7, 8, 9})
print(odds.intersection(evens))   # frozenset()
```

Frozensets are **hashable**, meaning they can be used as dictionary keys or elements of other sets, unlike normal (mutable) sets.

---

## 13. Use Cases and Best Practices

1. **Membership Testing**: Sets provide O(1) average time complexity for `in` checks, making them great for membership tests.
2. **Eliminating Duplicates**: Converting a list to a set automatically removes any duplicates.
3. **Set Algebra**: Union, intersection, and difference operations are common in data processing (e.g., working with categories or sets of IDs).
4. **Immutable Frozensets**: Use a `frozenset` when you want to store a set of items in a data structure that requires immutability (like a dictionary key).

---

## 14. Summary

**Sets** in Python are **unordered, mutable** collections with **unique** elements. They excel at membership testing, deduplication, and performing set-theoretic operations (union, intersection, difference, etc.). The related **frozenset** is immutable and can be used in contexts where a hashable type is required. By understanding these characteristics and methods—such as adding, removing, updating, and copying sets—you can more effectively handle tasks involving unique collections of items.