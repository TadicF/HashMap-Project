export class HashMap {
  constructor(loadFactor, capacity) {
    this.loadFactor = loadFactor;
    this.capacity = capacity
    this.buckets = new Array(capacity); // [16 empty slots...]
    this.entries = 0;
  }

  #hash(key) {
    let hashCode = 0;
    const primeNumber = 31;

    for(let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }
    return hashCode;
  }

  #checkCapacity() {
    const limit = Math.round(this.capacity * this.loadFactor);
    if(this.entries > limit) {
      this.#growCapacity();
    }
  }

  #growCapacity() {
    this.capacity *= 2; // Double the capacity
    this.entries = 0; // Reset entries

    const oldBuckets = this.mapEntries();
    this.buckets = new Array(this.capacity);

    oldBuckets.forEach((pair) => { 
      this.set(pair[0], pair[1]); // key at index 0, value at index 1
    })

    console.log(`expanding hashmap, new current capacity ${this.capacity}`);
  }

  set(key, value) {
    // Check if the passed key is not a string
    if(typeof key != 'string') {
      throw new Error('Key must be a string!')
    }
    // hash the key
    const index = this.#hash(key);
    // if the bucket is empty, initialize the linked list
    if(this.buckets[index] === undefined) { 
      this.buckets[index] = new LinkedList();
      this.buckets[index].append(key, value);
      this.entries++; 
    } 
    // Insert or update based on whether on not key exists within the bucket
    else {
      if(this.buckets[index].insertOrUpdate(key, value)) {
        this.entries++;
      };
    }
    this.#checkCapacity();
  }

  get(key) {
    const index = this.#hash(key);
    // Check if the bucket does not exists
    if(this.buckets[index] === undefined) {
      return null;
    } else {
      return this.buckets[index].find(key);
    }
  }

  has(key) {
    const index = this.#hash(key);
    // Check if the bucket does not exists
    if(this.buckets[index] === undefined) {
      return false;
    } else {
      return this.buckets[index].contains(key);
    }
  }

  remove(key) {
    const index = this.#hash(key);
    // Check if the bucket does not exists
    if(this.buckets[index] === undefined) {
      return false;
    } else {
      if(this.buckets[index].removeNode(key)) {
        this.entries--;
        return true;
      };
    }
  }

  length() {
    return this.entries;
  }

  clear() {
    if(this.entries === 0) {
      throw new Error(`Cannot clear an empty hash map.`);
    } 

    this.buckets = new Array(this.capacity);
    this.entries = 0;
  }

  keys() {
    let keysArr = [];
    this.buckets.forEach((bucket) => {
      if(bucket instanceof LinkedList) {
        let curr = bucket.head;
        while(curr != null) {
          keysArr.push(curr.key);
          curr = curr.next;
        }
      } 
    })

    return keysArr;
  }

  values() {
    let valueArr = [];
    this.buckets.forEach((bucket) => {
      if(bucket instanceof LinkedList) {
        let curr = bucket.head;
        while(curr != null) {
          valueArr.push(curr.value);
          curr = curr.next;
        }
      }
    });

    return valueArr;
  }

  mapEntries() {
    let entriesArr = [];
    this.buckets.forEach((bucket) => { // O(N)
      if(bucket instanceof LinkedList) {
        let currNode = bucket.head;
        while(currNode != null) {
          let pairArr = [];
          pairArr.push(currNode.key);
          pairArr.push(currNode.value);
          entriesArr.push(pairArr);
          currNode = currNode.next;
        }
      }
    })

    return entriesArr;
  }
}  



class LinkedList {
  #head = null;
  #tail = null;

  append(key, value) {
    if(this.#head === null) {
      const node = new Node(key, value);
      this.#head = node;
      this.#tail = node;
    }
    else {
      const node = new Node(key, value);
      this.#tail.next = node;
      this.#tail = node 
    }
  };

  contains(key) {       
    let currNode = this.#head;
    while(currNode != null) {
      if(currNode.key === key) {
        return true;
      }
      currNode = currNode.next;
    }
    return false;
  }

  insertOrUpdate(key, value = null) {
    let currNode = this.#head;
    while(currNode != null) {
      if(currNode.key === key) {
        currNode.value = value;
        return false; // return false if the value is just updated
      }
      currNode = currNode.next;
    }

    this.append(key, value);
    return true;
  }

  find(key) {
    let currNode = this.#head;
    while(currNode != null) {
      if(key === currNode.key) {
        return currNode.value;
      };
      currNode = currNode.next;
    };
    return null;
  }

  removeNode(key) {
    let currNode = this.#head;
    // Check if the first node has the provided key
    if(currNode.key === key) {
      this.#head = currNode.next;
      return true;
    }

    while(currNode.next != null) {
      if(currNode.next.key === key) {
        if(currNode.next.next === null) {
          this.#tail = currNode;
        }
        currNode.next = currNode.next.next;
        return true;
      }
      currNode = currNode.next;
    }
    return false;
  }

  get head() {
    return this.#head;
  }

  get tail() {
    return this.#tail;
  }
}

class Node {
  constructor(key = null, value = null, next= null) {
    this.key = key;
    this.value = value;
    this.next = next;
  }
}