pipeline {
    agent any

    stages {
        stage('Install Dependencies') {
            steps {
                dir('api') { // Navigate to the api directory
                    sh 'npm install'
                }
            }
        }

        stage('Run Tests') {
            steps {
                dir('api') { // Navigate to the api directory
                    sh 'npm test' // This will run `jest` as defined in the package.json
                }
            }
        }
    }

    post {
        always {
            // Archive test results if Jest produces any reports
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
