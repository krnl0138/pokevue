const ids = [1, 2, 3];

const users = {
  1: { name: "valery", age: 25 },
  2: { name: "mike", age: 42 },
  3: { name: "james", age: 55 },
};

const getUser = (id) => {
  if (!users[id]) throw new Error("User not found");
  return users[id];
};
function getUser2(id) {
  return users[id];
}

// 1.
// return {mike} while setTimeout is running
const serverGetUser = (id) => {
  setTimeout(() => {
    console.log("1 secs delay");
  }, 1000);
  return getUser(id);
};

// 2.
// immediately return {mike} and exit function body
// no setTimeout body is going to run
const serverGetUser2 = (id) => {
  return getUser2(id);
  setTimeout(() => {
    console.log("2 secs delay");
  }, 2000);
};

// 3.
// the setTimeout body is executed after 3 seconds
// {mike} will be returned only after 3 seconds
// but the code has nowhere to return the value this time
const serverGetUser3 = (id) => {
  setTimeout(() => {
    console.log("3 secs delay");
    return getUser(id);
  }, 3000);
};

// 4.
// we return the promise first
// this promise is fulfilled with 'resolve(getUser(id))'
// we can access the fulfilled value with .then() chaining;
const serverGetUser4 = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(getUser(id));
    }, 4000);
    reject(new Error("test"));
  });
};

const asyncCallServer = async (id) => {
  try {
    const result = await serverGetUser4(id);
    console.log("result is: ", result);
    return result;
  } catch (e) {
    throw new Error(e);
  }
};

// 5.
const serverGetUser5 = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(getUser(id));
    }, 4000);
    // reject(new Error("test"));
  });
};
const asyncCallServer2 = async (ids) => {
  try {
    const resArr = [];
    await ids.forEach(async (id) => {
      console.log(`fired serverGetUser5 for ${ids[--id]} time`);
      const result = await serverGetUser5(++id);
      console.log("result is: ", result);
      resArr.push(result);
    });

    console.log("resArr is: ", resArr);
    return resArr;
  } catch (e) {
    throw new Error(e);
  }
};

// console.log(serverGetUser(2));
// console.log(serverGetUser2(2));
// console.log(serverGetUser3(2));
// console.log(serverGetUser4(2).then((val) => console.log(val)));
// asyncCallServer(4);
asyncCallServer2(ids);
// console.log(result);
