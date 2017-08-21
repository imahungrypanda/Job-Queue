Create a job queue whose workers fetch data from a URL and store the results in a database. The job queue should expose a REST API for adding jobs and checking their status / results.

# Job Queue
 *Description*

 ### Example

 User submits www.google.com to your endpoint. The user gets back a job id. Your system fetches www.google.com (the result of which would be HTML) and stores the result. The user asks for the status of the job id and if the job is complete, he gets a response that includes the HTML for www.google.com

### Job Queue Features
- Fetch data from a URL (data being the HTML that the page returns)
- Store result in a database

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
