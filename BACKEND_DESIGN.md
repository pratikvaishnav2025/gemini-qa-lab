# Spring Boot Backend Specification

## 1. Folder Structure
```text
src/main/java/dev/alexchen/portfolio
├── config
│   └── RateLimitConfig.java      # Bucket4j configuration
├── controller
│   └── AIController.java         # REST Endpoints
├── dto
│   ├── request
│   │   ├── GenerationRequest.java
│   │   └── EvaluationRequest.java
│   └── response
│       ├── StoryResponse.java
│       └── EvaluationResponse.java
├── exception
│   └── GlobalExceptionHandler.java
└── service
    └── GeminiService.java        # Client for Google GenAI
```

## 2. API Endpoints

### POST /api/ai/generate
Generates career assets or technical blueprints.
- **Validation**: `projectName` (max 100 chars), `input` (min 20, max 5000 chars).
- **Rate Limit**: 5 requests per minute per IP.

### POST /api/ai/evaluate
Scores content quality.
- **Validation**: `content` (min 50 chars).
- **Rate Limit**: 10 requests per minute per IP.

## 3. Core Implementation Snippets

### DTO: GenerationRequest.java
```java
public record GenerationRequest(
    @NotBlank String type, // STORY, BLUEPRINT, REVIEW
    @NotBlank @Size(max = 100) String projectName,
    @NotBlank String role,
    @NotBlank @Size(min = 20, max = 5000) String input
) {}
```

### Service: GeminiService.java
```java
@Service
public class GeminiService {
    @Value("${google.api.key}")
    private String apiKey;

    private final RestClient restClient;

    public GeminiService(RestClient.Builder builder) {
        this.restClient = builder.baseUrl("https://generativelanguage.googleapis.com").build();
    }

    public StoryResponse generateStory(GenerationRequest req) {
        // Implementation using Google GenAI REST API or SDK
        // Maps response to StoryResponse DTO
    }
}
```

## 4. Environment Configuration
Store your key in `src/main/resources/application.properties`:
```properties
google.api.key=${GOOGLE_API_KEY}
spring.servlet.multipart.max-file-size=2MB
```
