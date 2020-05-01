# Mashup Web Docker 

The first assessment for the Cloud Computing unit requires that you build a web application – a server-side mashup – and then use a Docker container to deploy this application to a public cloud instance

## News Content Analysis 

News Content Analysis is a web mashup developed was part of the course requirements for CAB432, Semester 2, 2019. News Content Analysis aims to provide users with a summary of content analysis from top headlines in four different countries.  

Users can view the content labels of top headlines in their chosen country with utilising News and Cloud Natural Language APIs. The relevant results are presented in short articles with title, description, images and published date alongside the predicted labels. From this point, the user can click on a given button on any article to view all news that have similar labels

### Sample Usage 

#### Use Case 1

1. Load Website and Select Country (Australia)

![Homepage](images/intro.jpg)

2. View the article title and its content label 

![Sample1](images/sample1.png)

#### Use Case 2 

1. Click “View Similar News” button on article above 

![Sample2](images/sample2.png)

[Read Full Report Here](Report_n10069275.pdf)

### Download Instructions 

**Prequisites:**
1. Create a [GCP Account](https://cloud.google.com/gcp/) 
2. Register the Cloud Natural Language API 
3. Save the json file that contains information to use the API 
4. Get the News API key 

Use **Terminal** or **Command Prompt** to run the code 

1. Install [Docker](https://www.docker.com)
```
sudo curl -fsSL https://get.docker.com/ | sh
``` 

2. Download the folder 
```
git clone https://github.com/tranquanghuy0801/CAB432_Cloud_Computing
```

3. Go to the directory and install dependencies 
```
cd Assignment1 && cd app 
npm install 
```

4. Save the json file downloaded into the **app/** directory 

5. Create the **.env** file in **app/** directory and paste the following into with News API and json file information 
```
NewsAPIKey=******
GOOGLE_APPLICATION_CREDENTIALS=******.json  
```

6. Run Dockerfile 
```
cd ../
docker build -t docker-mashup .
docker run -p 3000:8000 -i -t docker-mashup
```

7. Run the web localhost 
```
http://localhost:3000 
```
