# 🔐 Simple Password Manager

A modern, secure, and user-friendly password management application built with Spring Boot backend and vanilla JavaScript frontend. This application provides a comprehensive solution for storing, managing, and securing your passwords with advanced encryption and intuitive user interface.

## 🌟 Features

### 🔒 Security Features
- **Advanced Encryption**: Passwords are encrypted using industry-standard encryption algorithms
- **Secure Authentication**: Spring Security integration with customizable authentication
- **Session Management**: Secure session handling with automatic timeout
- **Input Validation**: Comprehensive input validation to prevent injection attacks
- **CORS Protection**: Cross-Origin Resource Sharing protection enabled

### 💼 Password Management
- **Add New Passwords**: Securely store passwords with custom categories
- **Password Generation**: Built-in strong password generator
- **Search & Filter**: Quick search and filter functionality
- **Password Strength Indicator**: Visual password strength assessment
- **Export/Import**: Backup and restore password data
- **Password History**: Track password changes over time

### 🎨 User Interface
- **Modern Design**: Clean, responsive, and intuitive user interface
- **Dark/Light Theme**: Toggle between dark and light themes
- **Responsive Layout**: Works seamlessly on desktop, tablet, and mobile
- **Real-time Updates**: Instant feedback and updates
- **Accessibility**: WCAG compliant design for better accessibility

### 🛠 Technical Features
- **RESTful API**: Clean and well-documented REST API
- **Database Integration**: H2 in-memory database with JPA
- **Real-time Validation**: Client-side and server-side validation
- **Error Handling**: Comprehensive error handling and user feedback
- **Logging**: Detailed logging for debugging and monitoring

## 🚀 Quick Start

### Prerequisites
- Java 17 or higher
- Maven 3.6 or higher
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Naveenkm07/Simple-Password-Manager.git
   cd Simple-Password-Manager
   ```

2. **Build the project**
   ```bash
   mvn clean compile
   ```

3. **Run the application**
   ```bash
   mvn spring-boot:run
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8080
   - H2 Database Console: http://localhost:8080/h2-console

### Database Configuration
- **Database**: H2 In-Memory Database
- **Username**: `sa`
- **Password**: `password`
- **Console URL**: http://localhost:8080/h2-console

## 📁 Project Structure

```
Simple-Password-Manager/
├── src/
│   └── main/
│       ├── java/
│       │   └── com/
│       │       └── example/
│       │           └── backend/
│       │               ├── BackendApplication.java
│       │               ├── controller/
│       │               ├── service/
│       │               ├── repository/
│       │               ├── model/
│       │               ├── config/
│       │               ├── security/
│       │               └── exception/
│       └── resources/
│           └── application.properties
├── index.html
├── style.css
├── app.js
├── pom.xml
└── README.md
```

## 🔧 Configuration

### Application Properties
The application can be configured through `src/main/resources/application.properties`:

```properties
# Server configuration
server.port=8080

# Database configuration
spring.datasource.url=jdbc:h2:mem:testdb
spring.datasource.username=sa
spring.datasource.password=password

# JPA configuration
spring.jpa.hibernate.ddl-auto=create-drop
spring.jpa.show-sql=true

# Security configuration
spring.security.user.name=admin
spring.security.user.password=admin
```

## 🛡 Security

### Authentication
- Spring Security integration
- Custom authentication providers
- Session-based authentication
- CSRF protection enabled

### Data Protection
- Password encryption at rest
- Secure transmission (HTTPS recommended for production)
- Input sanitization
- SQL injection prevention

## 📱 API Documentation

### REST Endpoints

#### Password Management
- `GET /api/passwords` - Get all passwords
- `POST /api/passwords` - Create new password
- `PUT /api/passwords/{id}` - Update password
- `DELETE /api/passwords/{id}` - Delete password
- `GET /api/passwords/search` - Search passwords

#### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/status` - Check authentication status

#### Password Generation
- `GET /api/generate-password` - Generate strong password
- `POST /api/validate-password` - Validate password strength

## 🎯 Usage Guide

### Adding a New Password
1. Click the "Add Password" button
2. Fill in the required fields:
   - Website/Service name
   - Username/Email
   - Password (or use generator)
   - Category (optional)
   - Notes (optional)
3. Click "Save" to store the password

### Password Generation
1. Click the "Generate Password" button
2. Configure password options:
   - Length (8-64 characters)
   - Include uppercase letters
   - Include lowercase letters
   - Include numbers
   - Include special characters
3. Click "Generate" to create a strong password

### Searching Passwords
1. Use the search bar at the top
2. Type keywords to filter passwords
3. Use advanced filters for specific categories

### Exporting Data
1. Go to Settings
2. Click "Export Data"
3. Choose export format (JSON/CSV)
4. Download the file

## 🔧 Development

### Building from Source
```bash
# Clone the repository
git clone https://github.com/Naveenkm07/Simple-Password-Manager.git

# Navigate to project directory
cd Simple-Password-Manager

# Build the project
mvn clean install

# Run tests
mvn test

# Run the application
mvn spring-boot:run
```

### Development Tools
- **IDE**: IntelliJ IDEA, Eclipse, or VS Code
- **Build Tool**: Maven
- **Database**: H2 (development), MySQL/PostgreSQL (production)
- **Testing**: JUnit 5, Spring Boot Test

## 🧪 Testing

### Running Tests
```bash
# Run all tests
mvn test

# Run specific test class
mvn test -Dtest=PasswordServiceTest

# Run with coverage
mvn jacoco:report
```

### Test Coverage
- Unit tests for all service classes
- Integration tests for REST controllers
- Security tests for authentication
- Frontend tests for user interactions

## 🚀 Deployment

### Production Deployment
1. **Database Setup**
   ```bash
   # Configure production database
   spring.datasource.url=jdbc:mysql://localhost:3306/password_manager
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   ```

2. **Security Configuration**
   ```bash
   # Enable HTTPS
   server.ssl.enabled=true
   server.ssl.key-store=classpath:keystore.p12
   server.ssl.key-store-password=your_keystore_password
   ```

3. **Build and Deploy**
   ```bash
   # Create JAR file
   mvn clean package

   # Run the application
   java -jar target/backend-1.0.0.jar
   ```

### Docker Deployment
```dockerfile
FROM openjdk:17-jdk-slim
COPY target/backend-1.0.0.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","/app.jar"]
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Contribution Guidelines
- Follow the existing code style
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Spring Boot team for the excellent framework
- H2 Database for the in-memory database
- Bootstrap for the UI components
- All contributors and supporters

## 📞 Support

If you encounter any issues or have questions:

- **Issues**: [GitHub Issues](https://github.com/Naveenkm07/Simple-Password-Manager/issues)
- **Email**: kmnaveenkm01@gmail.com
- **Documentation**: [Wiki](https://github.com/Naveenkm07/Simple-Password-Manager/wiki)

## 🔄 Version History

### v1.0.0 (Current)
- Initial release
- Basic password management features
- Spring Boot backend
- Vanilla JavaScript frontend
- H2 database integration
- Spring Security implementation

### Upcoming Features
- [ ] Two-factor authentication
- [ ] Password sharing
- [ ] Browser extension
- [ ] Mobile app
- [ ] Cloud synchronization
- [ ] Advanced encryption options

---

**Made with ❤️ by Naveen KM**

*Keep your passwords secure, keep your digital life safe!* 
