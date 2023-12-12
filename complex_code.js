/* 
filename: complex_code.js
content: Advanced Social Networking Application
*/

// -------------------
// Models
// -------------------

// User Model
class User {
  constructor(name, age, email, gender) {
    this.name = name;
    this.age = age;
    this.email = email;
    this.gender = gender;
    this.friends = [];
    this.posts = [];
  }

  addFriend(user) {
    this.friends.push(user);
    user.friends.push(this);
  }

  createPost(content) {
    const post = new Post(this, content);
    this.posts.push(post);
    return post;
  }
}

// Post Model
class Post {
  constructor(user, content) {
    this.user = user;
    this.content = content;
    this.comments = [];
    this.likes = 0;
  }

  addLike() {
    this.likes++;
  }

  addComment(comment) {
    this.comments.push(comment);
  }
}

// Comment Model
class Comment {
  constructor(user, content) {
    this.user = user;
    this.content = content;
  }
}

// -------------------
// Usage Example
// -------------------

const user1 = new User('John', 25, 'john@example.com', 'male');
const user2 = new User('Jane', 23, 'jane@example.com', 'female');

user1.addFriend(user2);

const post1 = user1.createPost('Hello, everyone!');
const post2 = user2.createPost('I just joined this network!');

post1.addLike();
post1.addLike();
post2.addLike();

const comment1 = new Comment(user2, 'Welcome, John!');
post1.addComment(comment1);

console.log('\nUser 1:');
console.log(user1);

console.log('\nUser 2:');
console.log(user2);

console.log('\nPost 1:');
console.log(post1);

console.log('\nPost 2:');
console.log(post2);

console.log('\nComment 1:');
console.log(comment1);

// ... (additional lines of code)