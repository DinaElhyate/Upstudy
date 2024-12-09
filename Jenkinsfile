pipeline {
    agent any

    environment {
        NODE_ENV = 'test'
    }

    stages {
        stage('Install Dependencies') {
            steps {
                // Installer les dépendances du projet
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                // Exécuter les tests
                sh 'npm test'
            }
        }
    }

    post {
        always {
            // Archive les rapports ou afficher les logs
            archiveArtifacts artifacts: 'tests/**/*.js', allowEmptyArchive: true
        }
        success {
            echo 'Tests réussis!'
        }
        failure {
            echo 'Les tests ont échoué.'
        }
    }
}
