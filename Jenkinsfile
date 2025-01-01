pipeline {
    agent any

    stages {
        stage('Install Dependencies') {
            steps {
                dir('api') { 
                    sh 'npm install'
                }
            }
        }

        stage('Run Tests') {
            steps {
                dir('api') { 
                    sh 'npm test' 
                }
            }
        }
    }

    post {
        always {
          
            archiveArtifacts artifacts: 'api/tests/**/*.js', allowEmptyArchive: true
        }
        success {
            echo 'Tests réussis!'
        }
        failure {
            echo 'Les tests ont échoué.'
        }
    }
}
