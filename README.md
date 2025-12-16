# HashMap
Implementation of the HashMap data structure

# Features (# - private methods)
- **#hash(key)** takes the key as an argument and returns a hash code (index)
- **#checkCapacity()** triggers the hash map growth when the number of entries exceeds the load factor * capacity
- **#growCapacity()** doubles the current capacity
- **set(key, value)** adds or updates a new key/value pair to the hash map
- **get(key)** returns the value assigned to the given key
- **has(key)** returns true if the given key exists in the hash map, otherwise returns false
- **remove(key)** removes the given key from the hash map and returns true if successful, otherwise false
- **length()** returns the current number of entries in the hash map
- **clear()** removes all entries from the hash map
- **keys()** returns an array containing all the keys in the hash map
- **values()** returns an array containing all the values in the hash map
- **mapEntries()** returns an array containing all key/value pairs in the hash map
