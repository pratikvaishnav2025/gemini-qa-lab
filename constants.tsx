
import { Project, Skill } from './types';

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Distributed Test Harness',
    description: 'A cloud-native test orchestrator reducing execution cycles by 93%.',
    tags: ['Java 21', 'Spring Boot', 'Kubernetes', 'Redis'],
    link: '#',
    category: 'Automation',
    caseStudy: {
      outcome: "Reduced test execution time from 4 hours to 15 minutes while maintaining 99% stability.",
      context: "A global e-commerce platform faced massive release bottlenecks due to 5,000+ UI tests running sequentially in a legacy Jenkins environment.",
      contributions: [
        "Architected a Spring Boot micro-orchestrator using Java 21 Virtual Threads for non-blocking I/O.",
        "Implemented dynamic scaling of Selenium nodes on Kubernetes using custom K8s operators.",
        "Developed a Redis-based state machine to manage test retries and session persistence.",
        "Built a real-time observability dashboard with Grafana for live execution monitoring."
      ],
      challenges: [
        "Network Latency: Solved by implementing localized container registries and optimized Docker layers.",
        "Resource Contention: Mitigated via custom pod priority and pre-emption logic in the K8s scheduler.",
        "Flaky Tests: Introduced a 'Quarantine' logic that automatically isolates unstable tests from the main pipeline."
      ],
      improvements: [
        "Implement machine learning for automated failure classification based on historical logs.",
        "Integrate predictive test selection to run only impacted scenarios per commit."
      ]
    }
  },
  {
    id: '2',
    title: 'Quality Gateway Plugin',
    description: 'Enterprise Jenkins plugin enforcing BDD coverage and contract testing standards.',
    tags: ['Java', 'Jenkins API', 'Pact.io', 'Cucumber'],
    link: '#',
    category: 'Backend',
    caseStudy: {
      outcome: "Achieved zero production incidents related to API breaking changes over a 12-month period.",
      context: "A distributed microservices ecosystem with 40+ teams suffered from frequent 'integration hell' due to mismatched API versions and missing tests.",
      contributions: [
        "Developed a custom Jenkins plugin in Java to gate deployments based on mandatory BDD coverage thresholds.",
        "Integrated Pact.io for consumer-driven contract testing directly into the CI/CD pipeline.",
        "Created an automated Gherkin analyzer to ensure scenarios follow the 'Given-When-Then' best practices.",
        "Built a central reporting hub aggregating quality metrics across all independent microservices."
      ],
      challenges: [
        "Team Adoption: Solved by creating a CLI tool that generates contract boilerplates, reducing friction for developers.",
        "Version Synchronization: Implemented a global version registry to ensure consumers and providers remain aligned.",
        "Pipeline Latency: Optimized contract verification steps to run in parallel with unit tests."
      ],
      improvements: [
        "Develop an IntelliJ plugin to provide real-time 'Gateway Status' feedback during the coding phase.",
        "Leverage AI to suggest missing Gherkin scenarios based on new code changes."
      ]
    }
  },
  {
    id: '3',
    title: 'Retail API Engine',
    description: 'High-performance inventory engine optimized for cloud-native reliability.',
    tags: ['Spring Boot', 'PostgreSQL', 'Hazelcast', 'Docker'],
    link: '#',
    category: 'Backend',
    caseStudy: {
      outcome: "Increased peak throughput by 500% while maintaining sub-100ms P99 latency.",
      context: "A high-traffic inventory system required a migration from a monolithic legacy stack to a modern, scalable Java 21 architecture.",
      contributions: [
        "Redesigned core business logic to utilize the CQRS pattern for improved read/write separation.",
        "Implemented Hazelcast distributed caching to offload 70% of database read traffic.",
        "Optimized SQL query performance through advanced indexing and Hibernate query tuning.",
        "Established a 'Test-First' culture with 90% JUnit coverage for all critical business domains."
      ],
      challenges: [
        "Memory Leaks: Identified and fixed long-standing legacy leaks using Eclipse MAT and JProfiler.",
        "Data Consistency: Resolved eventual consistency issues in the cache layer using transactional notifications.",
        "Cold Starts: Migrated critical microservices to GraalVM Native Image for instantaneous startup times."
      ],
      improvements: [
        "Transition the persistence layer to a fully reactive architecture using R2DBC.",
        "Implement event-sourcing for a complete immutable audit trail of inventory movements."
      ]
    }
  }
];

export const SKILLS: Skill[] = [
  { name: 'Java', level: 95, category: 'Core' },
  { name: 'Spring Boot', level: 90, category: 'Core' },
  { name: 'Selenium', level: 92, category: 'Testing' },
  { name: 'Cucumber', level: 88, category: 'Testing' },
  { name: 'PostgreSQL', level: 82, category: 'Database' },
  { name: 'Docker', level: 85, category: 'Tools' }
];
