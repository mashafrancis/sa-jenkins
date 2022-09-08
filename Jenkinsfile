pipeline {
    agent {
        docker {
            image 'node:16.13.1-alpine'
            args '-u root --privileged -v /var/run/docker.sock:/var/run/docker.sock'
            }
        }

    stages {
        stage('Clone Repository') {
              steps {
                    script {
                        sh 'rm -rf .git'
                        final scmVars = checkout(scm)
                        env.BRANCH_NAME = scmVars.GIT_BRANCH
                        env.SHORT_COMMIT = "${scmVars.GIT_COMMIT[0..7]}"
                        env.GIT_REPO_NAME = scmVars.GIT_URL.replaceFirst(/^.*\/([^\/]+?).git$/, '$1')
                    }
                }
                }

        stage('Install Dependencies') {
            steps {
                script {
                    sh 'yarn --frozen-lockfile'
                }
            }
        }

        stage('Run Unit Tests') {
            steps {
                script {
                    sh 'yarn test:unit'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh 'apk add --update docker openrc'
                    sh 'make build-production'
                    // app = docker.build("${env.GIT_REPO_NAME}/development")
                    // app = docker.build("service-availability/dynatrace-reporting-frontend")
                }
            }
        }
    }

    post {
            always {
                cleanWs()
            }
        }
}
