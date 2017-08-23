# Job Queue

 Job Queue is a simple node api that fetches HTML from a requested URL.

### Setup

Requirements:
- MongoDB [installation guide](https://treehouse.github.io/installation-guides/)
- Node


1. Run `npm install`
2. Start MongoDB
3. Running `npm run start` starts the server


### Example

 User submits www.google.com to your endpoint. The user gets back a job id. Your system fetches www.google.com (the result of which would be HTML) and stores the result. The user asks for the status of the job id and if the job is complete, he gets a response that includes the HTML for www.google.com

 **Request Example**

 POST api/request?url=www.google.com

 **Response Example**
 ```JSON
  {
    "id": "599df002a0746149b07c3508"
  }
 ```

 **Request Example**

 GET /api/599df002a0746149b07c3508

 **Response Example**
 ```JSON
  {
    "id": "599df002a0746149b07c3508",
    "url": "www.google.com",
    "status": "Complete",
    "html": "<!doctype html><html....."
  }
 ```

### Job Queue Features
- [x] Fetch data from a URL (data being the HTML that the page returns)
- [x] Store result in a database

### API Endpoints

| Route          | Description    |
| :------------- | :------------- |
| POST /api/request   | Creates a job request to be performed. The ID of the job is returned and can be used to find the status of the job. |
| GET  /api/:id       | Id is the job id and returns the status of a job. If the job is complete the result of the job will be returned. |

### Database
Table: jobs

| Column Name    | Description     |
| :------------- | :------------- |
| ID             | Id of the job       |
| request_url    | Stores the URL that was sent to the API |
| response_html  | Response from the URL |
| status         | Shows the current status of the request and if an error occurred |
