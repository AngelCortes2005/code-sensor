import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || '',
});

export interface AnalysisResult {
  quality: {
    score: number;
    summary: string;
    issues: string[];
    strengths: string[];
  };
  security: {
    score: number;
    vulnerabilities: Array<{
      severity: 'critical' | 'high' | 'medium' | 'low';
      description: string;
      recommendation: string;
    }>;
  };
  structure: {
    score: number;
    organization: string;
    improvements: string[];
  };
  recommendations: Array<{
    category: string;
    priority: 'high' | 'medium' | 'low';
    description: string;
    implementation: string;
    resources?: Array<{
      title: string;
      url: string;
    }>;
    example?: string;
  }>;
  overall_score: number;
  summary: string;
}

const ANALYSIS_PROMPT = `You are an expert in code analysis and security. Analyze the following GitHub repository code and provide a detailed analysis.

You must respond ONLY with a valid JSON object that has EXACTLY this structure:

{
  "quality": {
    "score": <number 0-100>,
    "summary": "<text>",
    "issues": ["<issue1>", "<issue2>"],
    "strengths": ["<strength1>", "<strength2>"]
  },
  "security": {
    "score": <number 0-100>,
    "vulnerabilities": [
      {
        "severity": "<critical|high|medium|low>",
        "description": "<text>",
        "recommendation": "<text>"
      }
    ]
  },
  "structure": {
    "score": <number 0-100>,
    "organization": "<text>",
    "improvements": ["<improvement1>", "<improvement2>"]
  },
  "recommendations": [
    {
      "category": "<text>",
      "priority": "<high|medium|low>",
      "description": "<text>",
      "implementation": "<text>",
      "resources": [
        {
          "title": "<resource title>",
          "url": "<url>"
        }
      ],
      "example": "<code example if applicable>"
    }
  ],
  "overall_score": <number 0-100>,
  "summary": "<text>"
}

IMPORTANT: Respond ONLY with the JSON. Do not add explanations, markdown or additional text.`;

export async function analyzeRepository(
  repoName: string,
  repoContent: {
    files: Array<{ path: string; content: string; language?: string }>;
    readme?: string;
    packageJson?: any;
  }
): Promise<AnalysisResult> {
  try {
    // Prepare repository context
    const context = `
# Repository: ${repoName}

## README
${repoContent.readme || 'No README available'}

## Project files:
${repoContent.files.map(f => `
### ${f.path} ${f.language ? `(${f.language})` : ''}
\`\`\`
${f.content.substring(0, 2000)} // Limited to 2000 chars per file
\`\`\`
`).join('\n')}

${repoContent.packageJson ? `
## package.json
\`\`\`json
${JSON.stringify(repoContent.packageJson, null, 2)}
\`\`\`
` : ''}
`;

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: ANALYSIS_PROMPT,
        },
        {
          role: 'user',
          content: `Analyze this repository and respond with JSON:\n\n${context}`,
        },
      ],
      model: 'llama-3.3-70b-versatile', // Modelo gratis más potente (actualizado)
      temperature: 0.3,
      max_tokens: 4000,
      response_format: { type: 'json_object' },
    });

    const responseText = completion.choices[0]?.message?.content || '{}';
    console.log('AI Response:', responseText); // Debug log
    
    const analysis = JSON.parse(responseText) as AnalysisResult;

    // Validar que tenga la estructura esperada
    if (!analysis.quality || !analysis.security || !analysis.structure) {
      console.error('Invalid analysis structure:', analysis);
      throw new Error('Invalid analysis response format');
    }

    return analysis;
  } catch (error) {
    console.error('Error analyzing repository:', error);
    throw error;
  }
}

export async function analyzeCodeSnippet(
  code: string,
  language: string,
  focusArea?: 'security' | 'quality' | 'performance'
): Promise<string> {
  try {
    const focus = focusArea || 'general';
    const prompt = `Analyze this ${language} code snippet focusing on ${focus}. Provide specific feedback and recommendations:

\`\`\`${language}
${code}
\`\`\`

Respond with:
1. Issues found
2. Specific recommendations
3. Improved code if applicable`;

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are a code analysis expert who provides constructive and detailed feedback.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.5,
      max_tokens: 2000,
    });

    return completion.choices[0]?.message?.content || 'Could not generate analysis';
  } catch (error) {
    console.error('Error analyzing code snippet:', error);
    throw error;
  }
}
