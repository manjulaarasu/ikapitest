/**const axios = require('axios');
const assert = require('assert');

describe('jsonplaceholder /posts API endpoint', () => {
  
  const baseURL = 'https://jsonplaceholder.typicode.com/posts';
  
  it('GET request should retrieve posts', async () => {
    const response = await axios.get(baseURL);
    console.log('GET Response:', response.data);
    assert.equal(response.status, 200);
    assert(Array.isArray(response.data), 'Response should be an array');
  });

  it('POST request should create a post', async () => {
    const newPost = {
      title: 'foo',
      body: 'bar',
      userId: 1
    };
    const response = await axios.post(baseURL, newPost, {
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    console.log('POST Response:', response.data);
    assert.equal(response.status, 201);
    assert.equal(response.data.title, newPost.title);
    assert.equal(response.data.body, newPost.body);
    assert.equal(response.data.userId, newPost.userId);
  });

  it('PUT request should update a post', async () => {
    const updatedPost = {
      id: 1,
      title: 'updated foo',
      body: 'updated bar',
      userId: 1
    };
    const response = await axios.put(`${baseURL}/1`, updatedPost, {
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    console.log('PUT Response:', response.data);
    assert.equal(response.status, 200);
    assert.equal(response.data.id, updatedPost.id);
    assert.equal(response.data.title, updatedPost.title);
    assert.equal(response.data.body, updatedPost.body);
    assert.equal(response.data.userId, updatedPost.userId);
  });

  it('PATCH request should partially update a post', async () => {
    const partialUpdate = {
      title: 'patched foo'
    };
    const response = await axios.patch(`${baseURL}/1`, partialUpdate, {
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    console.log('PATCH Response:', response.data);
    assert.equal(response.status, 200);
    assert.equal(response.data.title, partialUpdate.title);
  });

  it('DELETE request should delete a post', async () => {
    const response = await axios.delete(`${baseURL}/1`);
    console.log('DELETE Response:', response.data);
    assert.equal(response.status, 200);
  });
  
});

**/


/**const axios = require('axios');
const { expect } = require('chai');

const generateEndpoint = (resource = '') => `https://jsonplaceholder.typicode.com/posts${resource}`;

const generateHeaders = () => ({
  'Content-type': 'application/json; charset=UTF-8',
});

const generateData = (data) => data;

const makeHttpRequest = async (method, url, data = {}, headers = {}) => {
  try {
    const response = await axios({ method, url, data, headers });
    return response;
  } catch (error) {
    // Here, we log the error and re-throw it to ensure the test fails
    console.error('HTTP Request failed:', error);
    throw error;
  }
};

const parseAndValidateResponse = (response, expectedStatusCode, expectedData) => {
  // Validate status code
  //expect(response.status).to.equal(expectedStatusCode);
  expect(response.status).to.equal(expectedStatusCode, `Expected status code to be ${expectedStatusCode} but got ${response.status}`);

  // If we expect data, validate it in the response body
  if (expectedData) {
    const responseData = JSON.stringify(response.data);
    // Log actual and expected data for debugging
    console.log('Actual Response Data:', responseData);
    console.log('Expected Data:', JSON.stringify(expectedData));
   // expect(responseData).to.contain(JSON.stringify(expectedData));
    // Check if expectedData is an object and if it is, assert each property
    if (typeof expectedData === 'object' && !Array.isArray(expectedData) && expectedData !== null) {
        // We loop over the expectedData keys to assert each expected value
        Object.keys(expectedData).forEach(key => {
          expect(response.data).to.have.property(key, expectedData[key], `Expected property ${key} to be ${expectedData[key]} but got ${response.data[key]}`);
        });
      } else {
        // If expectedData is not an object (e.g., when expecting a string or null), we perform a direct comparison
        expect(responseData).to.contain(JSON.stringify(expectedData), `Expected data to contain ${JSON.stringify(expectedData)} but got ${responseData}`);
      }
  }
};

// Test Cases
describe('jsonplaceholder /posts API endpoint tests', function() {

  it('GET request should retrieve posts', async function() {
    const url = generateEndpoint();
    const response = await makeHttpRequest('GET', url);
    parseAndValidateResponse(response, 200);
  });

  it('POST request should create a post', async function() {
    const url = generateEndpoint();
    const data = generateData({
      title: 'foo',
      body: 'bar',
      userId: 1
    });
    const headers = generateHeaders();
    const response = await makeHttpRequest('POST', url, data, headers);
    parseAndValidateResponse(response, 201, data);
  });
  it('PUT request should update a post', async function() {
    const postId = '/1'; // We are assuming post with ID 1 exists for testing purposes
    const url = generateEndpoint(postId);
    const data = generateData({
      id: 1,
      title: 'updated foo',
      body: 'updated bar',
      userId: 1
    });
    const headers = generateHeaders();
    const response = await makeHttpRequest('PUT', url, data, headers);
    parseAndValidateResponse(response, 200, data);
  });

  it('PATCH request should partially update a post', async function() {
    const postId = '/1'; // We are assuming post with ID 1 exists for testing purposes
    const url = generateEndpoint(postId);
    const partialData = generateData({
      title: 'patched foo'
    });
    const headers = generateHeaders();
    const response = await makeHttpRequest('PATCH', url, partialData, headers);
    parseAndValidateResponse(response, 200, partialData);
  });

  it('DELETE request should delete a post', async function() {
    const postId = '/1'; // We are assuming post with ID 1 exists for testing purposes
    const url = generateEndpoint(postId);
    const response = await makeHttpRequest('DELETE', url);
    parseAndValidateResponse(response, 200);
    // The response body for a DELETE request is usually empty, so no need to check for expected data
  });

}); **/



/**const axios = require('axios');
const { expect } = require('chai');

// Utility function to generate the API endpoint URL
const generateEndpoint = (path = '') => {
    return `https://jsonplaceholder.typicode.com/posts${path}`;
  };
  
  // Utility function to generate the request headers
  const generateHeaders = () => {
    return {
      'Content-type': 'application/json; charset=UTF-8',
    };
  };
  
  // Utility function to generate data payloads
  const generateData = (data) => {
    return JSON.stringify(data);
  };
  
  // Utility function to make the HTTP request
  const makeHttpRequest = async (method, url, data = null, headers = {}) => {
    try {
      const response = await axios({
        method,
        url,
        data,
        headers
      });
      return response;
    } catch (error) {
      // If the request fails, we throw the error to be handled by the caller
      throw error;
    }
  };
  

describe('jsonplaceholder /posts API failure tests', function() {

  it('GET request for a non-existent post should return 404', async function() {
    const nonExistentPostId = '/9999'; // An ID we assume does not exist
    const url = generateEndpoint(nonExistentPostId);

    try {
      await makeHttpRequest('GET', url);
      throw new Error('Expected to throw on 404 status code');
    } catch (error) {
      expect(error.response.status).to.equal(404);
    }
  });

  it('POST request with invalid data should return 400', async function() {
    const url = generateEndpoint();
    const invalidData = generateData({}); // Sending empty data which is invalid
    const headers = generateHeaders();

    try {
      await makeHttpRequest('POST', url, invalidData, headers);
      throw new Error('Expected to throw on 400 status code');
    } catch (error) {
      expect(error.response.status).to.equal(400);
    }
  });

  it('PUT request to update a non-existent post should return 404', async function() {
    const nonExistentPostId = '/9999'; // An ID we assume does not exist
    const url = generateEndpoint(nonExistentPostId);
    const data = generateData({
      id: 9999,
      title: 'updated foo',
      body: 'updated bar',
      userId: 1
    });
    const headers = generateHeaders();

    try {
      await makeHttpRequest('PUT', url, data, headers);
      throw new Error('Expected to throw on 404 status code');
    } catch (error) {
      expect(error.response.status).to.equal(404);
    }
  });

  it('PATCH request to partially update a non-existent post should return 404', async function() {
    const nonExistentPostId = '/9999'; // An ID we assume does not exist
    const url = generateEndpoint(nonExistentPostId);
    const partialData = generateData({
      title: 'patched foo'
    });
    const headers = generateHeaders();

    try {
      await makeHttpRequest('PATCH', url, partialData, headers);
      throw new Error('Expected to throw on 404 status code');
    } catch (error) {
      expect(error.response.status).to.equal(404);
    }
  });

  it('DELETE request for a non-existent post should return 404', async function() {
    const nonExistentPostId = '/9999'; // An ID we assume does not exist
    const url = generateEndpoint(nonExistentPostId);

    try {
      await makeHttpRequest('DELETE', url);
      throw new Error('Expected to throw on 404 status code');
    } catch (error) {
      expect(error.response.status).to.equal(404);
    }
  });

}); 
**/


const axios = require('axios');
const { expect } = require('chai');

// Utility function to generate the API endpoint URL
const generateEndpoint = (path = '') => {
    return `https://jsonplaceholder.typicode.com/posts${path}`;
  };
  
  // Utility function to generate the request headers
  const generateHeaders = () => {
    return {
      'Content-type': 'application/json; charset=UTF-8',
    };
  };
  
  // Utility function to generate data payloads
  const generateData = (data) => {
    return JSON.stringify(data);
  };
  
  // Utility function to make the HTTP request
  const makeHttpRequest = async (method, url, data = null, headers = {}) => {
    try {
      const response = await axios({
        method,
        url,
        data,
        headers
      });
      return response;
    } catch (error) {
      // If the request fails, we throw the error to be handled by the caller
      throw error;
    }
  };

  const parseAndValidateResponse = (response, expectedStatusCode, expectedData) => {
    // Validate status code
    //expect(response.status).to.equal(expectedStatusCode);
    expect(response.status).to.equal(expectedStatusCode, `Expected status code to be ${expectedStatusCode} but got ${response.status}`);
  
    // If we expect data, validate it in the response body
    if (expectedData) {
      const responseData = JSON.stringify(response.data);
      // Log actual and expected data for debugging
      console.log('Actual Response Data:', responseData);
      console.log('Expected Data:', JSON.stringify(expectedData));
     // expect(responseData).to.contain(JSON.stringify(expectedData));
      // Check if expectedData is an object and if it is, assert each property
      if (typeof expectedData === 'object' && !Array.isArray(expectedData) && expectedData !== null) {
          // We loop over the expectedData keys to assert each expected value
          Object.keys(expectedData).forEach(key => {
            expect(response.data).to.have.property(key, expectedData[key], `Expected property ${key} to be ${expectedData[key]} but got ${response.data[key]}`);
          });
        } else {
          // If expectedData is not an object (e.g., when expecting a string or null), we perform a direct comparison
          expect(responseData).to.contain(JSON.stringify(expectedData), `Expected data to contain ${JSON.stringify(expectedData)} but got ${responseData}`);
        }
    }
  };

  // Test Cases
describe('jsonplaceholder /posts API failure tests', function() {
    this.timeout(10000); // extending timeout for async operations if needed
  
    it('GET request for a non-existent post should return 404', async function() {
      const postId = '/nonexistent'; // A non-existent post ID
      const url = generateEndpoint(postId);
      try {
        const response = await makeHttpRequest('GET', url);
        parseAndValidateResponse(response, 404);
      } catch (error) {
        //expect(error.response.status).to.equal(404);
        if (error.response) {
            expect(error.response.status).to.equal(404);
          } else {
            // If there's no response, then it was a network error or server is down
            throw new Error('Failed without a server response: ' + error.message);
          }
      }
    });
  
    it('POST request with invalid data should return 400', async function() {
      const url = generateEndpoint();
      const data = generateData({}); // Invalid data, assuming title and body are required
      const headers = generateHeaders();
      try {
        const response = await makeHttpRequest('POST', url, data, headers);
        parseAndValidateResponse(response, 400);
      } catch (error) {
        //expect(error.response.status).to.equal(400);
        if (error.response) {
            expect(error.response.status).to.equal(404);
          } else {
            // If there's no response, then it was a network error or server is down
            throw new Error('Failed without a server response: ' + error.message);
          }
      }
    });
  
    it('PUT request to update a non-existent post should return 404', async function() {
      const postId = '/nonexistent'; // A non-existent post ID
      const url = generateEndpoint(postId);
      const data = generateData({
        title: 'updated foo',
        body: 'updated bar',
        userId: 1
      });
      const headers = generateHeaders();
      try {
        const response = await makeHttpRequest('PUT', url, data, headers);
        parseAndValidateResponse(response, 404);
      } catch (error) {
        //expect(error.response.status).to.equal(404);
        if (error.response) {
            expect(error.response.status).to.equal(404);
          } else {
            // If there's no response, then it was a network error or server is down
            throw new Error('Failed without a server response: ' + error.message);
        }
      }
    });
  
    it('PATCH request to partially update a non-existent post should return 404', async function() {
      const postId = '/nonexistent'; // A non-existent post ID
      const url = generateEndpoint(postId);
      const partialData = generateData({
        title: 'patched foo'
      });
      const headers = generateHeaders();
      try {
        const response = await makeHttpRequest('PATCH', url, partialData, headers);
        parseAndValidateResponse(response, 404);
      } catch (error) {
        //expect(error.response.status).to.equal(404);
        if (error.response) {
            expect(error.response.status).to.equal(404);
          } else {
            // If there's no response, then it was a network error or server is down
            throw new Error('Failed without a server response: ' + error.message);
        }
      }
    });
  
    it('DELETE request for a non-existent post should return 404', async function() {
      const postId = '/nonexistent'; // A non-existent post ID
      const url = generateEndpoint(postId);
      try {
        const response = await makeHttpRequest('DELETE', url);
        parseAndValidateResponse(response, 404);
      } catch (error) {
        //expect(error.response.status).to.equal(404);
        if (error.response) {
            expect(error.response.status).to.equal(404);
          } else {
            // If there's no response, then it was a network error or server is down
            throw new Error('Failed without a server response: ' + error.message);
        }
      }
    });
  
  });