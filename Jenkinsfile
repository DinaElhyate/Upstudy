pipeline {
    agent any

    stages {
        stage('Install Dependencies') {
            steps {
                dir('api') { // Change directory to /api
                    sh 'npm install'
                }
            }
        }

        stage('Run Tests') {
            steps {
                dir('api') { // Change directory to /api
                    sh 'npm test' // Ensure the test script in package.json is configured to run tests in /api/tests
                }
            }
        }
    }

    post {
        always {
            // Archive test results if applicable
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
