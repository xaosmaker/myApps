pipeline {
  agent { 
    label 'ubuntu'
    }
  triggers {
    pollSCM '* * * * *'
    }
  stages {
    stage('Notify'){
      steps{

      slackSend channel: '#myapps', message:"Starting Building branch ${env.BRANCH_NAME}...\nURL: ${env.RUN_DISPLAY_URL} \nBuild: #${env.BUILD_NUMBER}", tokenCredentialId: 'mytests-hq'
      }
    }

    stage('stop docker all containers and start portainer '){
      steps{
        sh "docker stop \$(docker ps -aq)"
        sh"docker start portainer"
      }
    }
    stage('clean docker containers and volumes'){
      steps{
        sh "docker container prune -f"
        sh "docker volume prune -af"
      }
    }
    stage('copy env.local'){

      steps{
        configFileProvider([configFile(fileId: '52ef0837-0124-497d-a52c-2da8c2bb2934', targetLocation:'.envs/')]){}
      }
    }
    stage('docker Build') {
      steps {
        sh """
          docker compose -f local.yml \
          up -d --build --remove-orphans
           """
      }
    }
    stage('python test') {
      steps {
        sh """
           docker compose -f local.yml \
           run --rm myapps_api pytest
           """
      }  
    }
    stage('React Tests') {
      steps {
        echo 'Deliver....'
            }
        }
    stage("docker stop containers and remove volumes"){
      steps{
        sh """ docker compose -f local.yml down -v """
       }
      }
    }
    post{
    success{

      slackSend channel: '#myapps',color:'#5cb85c', message:"Starting Building branch ${env.BRANCH_NAME}...\nURL: ${env.RUN_DISPLAY_URL} \nBuild: #${env.BUILD_NUMBER}\n***BUILD SUCCEDED***", tokenCredentialId: 'mytests-hq'
    }

   failure {

      slackSend channel: '#myapps',color:'#FA113D', message:"Starting Building branch ${env.BRANCH_NAME}...\nURL: ${env.RUN_DISPLAY_URL} \nBuild: #${env.BUILD_NUMBER}\n***BUILD FAILED***", tokenCredentialId: 'mytests-hq'
    }
      always{


        cleanWs()
      }
    }
  }
