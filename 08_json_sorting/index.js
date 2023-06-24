const urls = [
  "https://jsonbase.com/sls-team/json-793",
  "https://jsonbase.com/sls-team/json-955",
  "https://jsonbase.com/sls-team/json-231",
  "https://jsonbase.com/sls-team/json-931",
  "https://jsonbase.com/sls-team/json-93",
  "https://jsonbase.com/sls-team/json-342",
  "https://jsonbase.com/sls-team/json-770",
  "https://jsonbase.com/sls-team/json-491",
  "https://jsonbase.com/sls-team/json-281",
  "https://jsonbase.com/sls-team/json-718",
  "https://jsonbase.com/sls-team/json-310",
  "https://jsonbase.com/sls-team/json-806",
  "https://jsonbase.com/sls-team/json-469",
  "https://jsonbase.com/sls-team/json-258",
  "https://jsonbase.com/sls-team/json-516",
  "https://jsonbase.com/sls-team/json-79",
  "https://jsonbase.com/sls-team/json-706",
  "https://jsonbase.com/sls-team/json-521",
  "https://jsonbase.com/sls-team/json-350",
  "https://jsonbase.com/sls-team/json-64",
];

async function getUrlData(url) {
  for (let i = 0; i <= 3; i++) {
    const ulrRequest = await fetch(url);
    const urlData = await ulrRequest.json();
    if (ulrRequest.status === 200) {
      return urlData;
    } else {
      continue;
    }
  }
  return null;
}

function findIsDone(data) {
  if (data.hasOwnProperty("isDone")) {
    const isDone = data.isDone;
    return isDone;
  } else {
    if (typeof data === "object") {
      for (let key of Object.keys(data)) {
        const result = findIsDone(data[key]);
        if (result !== null) {
          return result;
        }
      }
    }
  }
  return null;
}

async function jsonSort() {
  let results = [];
  for (let url of urls) {
    const data = await getUrlData(url);
    const isDoneData = findIsDone(data);
    results.push(isDoneData);
    if (isDoneData !== undefined) {
      if (isDoneData === true) {
        console.log(`[Success] ${url}: isDone - True`);
      } else {
        console.log(`[Success] ${url}: isDone - False`);
      }
    } else {
      console.log(`[Fail] ${url}: The endpoint is unavailable`);
    }
  }
  const countTrue = results.filter((data) => {
    return data === true;
  }).length;
  console.log(`Found True values: ${countTrue}`);
  console.log(`Found False values: ${results.length - countTrue}`);
}

jsonSort();
