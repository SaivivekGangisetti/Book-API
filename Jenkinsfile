pipeline {
    agent any

    environment {
        TOMCAT_HOME = "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1"
    }

    stages {
        // ===== FRONTEND BUILD =====
        stage('Build Frontend') {
            steps {
                dir('FRONTEND/book-frontend') {
                    bat 'npm install'
                    bat 'npm run build'
                }
            }
        }

        // ===== FRONTEND DEPLOY =====
        stage('Deploy Frontend to Tomcat') {
            steps {
                bat """
                if exist "%TOMCAT_HOME%\\webapps\\book-frontend" (
                    rmdir /S /Q "%TOMCAT_HOME%\\webapps\\book-frontend"
                )
                mkdir "%TOMCAT_HOME%\\webapps\\book-frontend"
                xcopy /E /I /Y FRONTEND\\book-frontend\\dist\\* "%TOMCAT_HOME%\\webapps\\book-frontend"
                """
            }
        }

        // ===== BACKEND BUILD =====
        stage('Build Backend') {
            steps {
                dir('BACKEND/book-api') {
                    bat 'mvn clean package -DskipTests'
                }
            }
        }

        // ===== BACKEND DEPLOY =====
        stage('Deploy Backend to Tomcat') {
            steps {
                bat """
                if exist "%TOMCAT_HOME%\\webapps\\book-backend.war" (
                    del /Q "%TOMCAT_HOME%\\webapps\\book-backend.war"
                )
                if exist "%TOMCAT_HOME%\\webapps\\book-backend" (
                    rmdir /S /Q "%TOMCAT_HOME%\\webapps\\book-backend"
                )
                for %%f in (BACKEND\\book-api\\target\\*.war) do (
                    copy "%%f" "%TOMCAT_HOME%\\webapps\\book-backend.war"
                )
                """
            }
        }

        // ===== RESTART TOMCAT =====
        stage('Restart Tomcat') {
            steps {
                bat """
                net stop Tomcat10
                timeout /t 5
                net start Tomcat10
                """
            }
        }
    }

    post {
        success {
            echo '✅ Deployment Successful! Access backend at http://localhost:8080/book-backend'
        }
        failure {
            echo '❌ Pipeline Failed. Check logs.'
        }
    }
}
