pipeline {
    agent {
        docker {
            image 'node:16.13.1-alpine'
            args '-u root --privileged -v /var/run/docker.sock:/var/run/docker.sock'
        }
    }

    // environment {
    //     APP_STAGING = credentials('APP_STAGING')
    //     APP_PRODUCTION = credentials('APP_PRODUCTION')
    //     SNYK_TOKEN = credentials('SNYK_TOKEN')
    // }

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

        // stage('Copy Credentials') {
        //     steps {
        //         script {
        //             if (env.BRANCH_NAME == 'main') {
        //                 sh 'cp $APP_PRODUCTION .env'
        //                     } else {
        //                 sh 'cp $APP_STAGING .env'
        //             }
        //         }
        //     }
        // }

        stage('Snyk Security Scan') {
            steps {
                snykSecurity(
                      snykInstallation: 'SA App',
                      snykTokenId: environment.SNYK_TOKEN,
                    )
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
                    app = docker.build("${env.GIT_REPO_NAME}")
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
        success {
            echo 'I succeeded!'
        }
        failure {
            mail to: 'francismasha96@gmail.com',
                subject: "Failed Pipeline: ${currentBuild.fullDisplayName}",
                body: "Something is wrong with ${env.BUILD_URL}."
        }
    }
}
