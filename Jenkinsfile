pipeline {
    agent {
      label "docker1"
   }
    environment {
        SERVICE = "internal-dashboard"
        DOCKERHUB_CRED = credentials('DOCKERHUB_CRED')
        TAG_NAME = sh(returnStdout: true, script: "git tag --points-at=HEAD")
        imageName = "esoko/internal-dashboard"
        IMAGE = "dtr.esoko.com:5000/esoko/internal-dashboard"
        imageTag = "${env.BUILD_ID}"
        TAG = "alpha"
    }
      triggers {
    pollSCM('* * * * *')
      }

    stages {
        stage("Build DockerFile and Tag to Dtr" ) {
            when {
                anyOf { branch 'develop'; branch 'Sprint*'; branch 'Hotfix*'; branch 'master'; branch 'main'; branch 'sprint*' }
              }
            steps {
             sh "docker build -t ${env.IMAGE}:${env.TAG} ."
		     //sh "docker tag ${IMAGE}:${TAG} dtr.esoko.com:5000/${env.IMAGE}:${env.TAG}"
		     sh "docker push ${env.IMAGE}:${env.TAG}"
            }
        }
        stage("build - prod") {
            when {
               tag "v*"
            }
            steps {
                sh "docker build -f Dockerfile.prod -t ${env.imageName}:${env.imageTag} ."
            }
        }
        stage("release") {
            when {
                tag "v*"
            }

            steps {
                sh "docker tag ${env.imageName}:${env.imageTag} ${env.imageName}:${env.TAG_NAME}"
                sh "docker login --username ${DOCKERHUB_CRED_USR} --password '${DOCKERHUB_CRED_PSW}'"
                sh "docker push ${env.imageName}:${env.TAG_NAME}"
            }
        }
        stage("build - lsr-prod") {
            when {
               tag "lsr*"
            }

            steps {
               sh "docker build -f Dockerfile.liberia -t ${env.imageName}:${env.imageTag} ."
            }
        }
        stage("release - lsr") {
            when {
                tag "lsr*"
            }

            steps {
               sh "docker tag ${env.imageName}:${env.imageTag} ${env.imageName}:${env.TAG_NAME}"
               sh "docker login --username ${DOCKERHUB_CRED_USR} --password '${DOCKERHUB_CRED_PSW}'"
               sh "docker push ${env.imageName}:${env.TAG_NAME}"
            }
        }
    }

    post {
        always {
            cleanWs(cleanWhenNotBuilt: false,
                    deleteDirs: true,
                    disableDeferredWipeout: true,
                    notFailBuild: true,
                    patterns: [[pattern: '.gitignore', type: 'INCLUDE'],
                               [pattern: '.propsfile', type: 'EXCLUDE']])
        }
    }
}
