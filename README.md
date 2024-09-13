# LLM-Powered Project Templates

## Overview

This project provides a collection of templates designed to be used with Large Language Models (LLMs) for rapid application development. Our goal is to streamline the process of scaffolding up applications with agentic action by providing 'best practices' bases.

We may also build up the tooling to do the LLM calls, as a substitute for other software engineering agents, with a focus on modifying and scaffolding our templates.

## Key Features

1. **AI-Optimized Templates**: Designed so that are as simple as possible while being relatively "complete" for base operations.

2. **Modular Design**: Templates are built with modularity in mind, allowing for easy expansion and customization; we use SQLAAlchemy for database management and SQLite for a db, but with the intent that can easily be modified but is trivial to POC or run micro apps at small scale.

3. **Best Practices Incorporated**: Template to attempt to follow industry best practices for code structure, security, and scalability.

4. **Comprehensive Documentation**: Heavy documentation and comments to help hint LLMs on how to modify

## Available Templates

Currently, we offer the following template:

- **FastAPI-React**: A full-stack web application template using FastAPI for the backend and React for the frontend, managing 'WidgetA' and 'WidgetB' resources.

## How to Use

1. Choose the appropriate template for your project.
2. Use an LLM (like GPT-4) to help you customize the template according to your specific needs.
3. Follow the instructions in the template's INSTRUCTIONS.md files for setup and customization guidance.

## Contribution

We welcome contributions to improve existing templates or add new ones. Please ensure that any contributions maintain the AI-friendly structure and comprehensive documentation that characterizes this project.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Disclaimer

While these templates are designed to work well with LLMs, always review and test the generated code thoroughly before using it in production environments.