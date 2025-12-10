export class HashMap {
  constructor(loadFactor, capacity) {
    this.loadFactor = loadFactor;
    this.capacity = capacity
    this.buckets = new Array(capacity); // [16 empty slots...] 
  }

  #hash(key) {
    let hashCode = 0;
    const primeNumber = 31;

    for(let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }
    return hashCode % this.capacity;
  }

  set(key, value) {
    // hash the key
    const index = this.#hash(key);
    console.log(`index: ${index}`);
    // if the bucket is empty, initialize the linked list
    if(this.buckets[index] === undefined) { 
      this.buckets[index] = new LinkedList();
      this.buckets[index].append(key, value);
    } 
    // check if the key already exists within the bucket || append
    else {
      this.buckets[index].insertOrUpdate(key, value);
    }
    console.log(this.buckets[index].head)
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
        return;
      }
      currNode = currNode.next;
    }

    this.append(key, value);
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