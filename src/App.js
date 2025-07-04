import React, { useState, useRef } from 'react';
import { FileText, Upload, CheckCircle, AlertCircle, Info, Award, Download, RefreshCw, Calendar, User, Building, TrendingUp, FileCheck, Printer, Mail, Share2 } from 'lucide-react';

const TDACopilotAgent = () => {
  const [document, setDocument] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [reportMetadata, setReportMetadata] = useState({
    documentTitle: '',
    projectName: '',
    submittedBy: '',
    organization: '',
    assessmentDate: new Date().toISOString().split('T')[0]
  });
  const fileInputRef = useRef(null);
  const printRef = useRef(null);

  // Scoring criteria based on Microsoft frameworks
  const scoringCriteria = {
    cloudAdoptionAlignment: {
      title: "Cloud Adoption Framework Alignment",
      description: "Strategy, Plan, Ready, Adopt, Govern, Manage methodologies",
      maxScore: 100,
      criteria: [
        "Business strategy and cloud rationale clearly defined",
        "Cloud adoption plan with timeline and milestones",
        "Landing zone design and implementation approach",
        "Migration or modernization strategy outlined",
        "Governance and compliance framework referenced",
        "Management and monitoring approach defined"
      ]
    },
    wellArchitectedAlignment: {
      title: "Well-Architected Framework Alignment", 
      description: "Reliability, Security, Cost Optimization, Operational Excellence, Performance Efficiency",
      maxScore: 100,
      criteria: [
        "Reliability patterns and fault tolerance addressed",
        "Security controls and compliance requirements defined",
        "Cost optimization strategies and budget considerations",
        "Operational excellence practices and automation",
        "Performance efficiency and scalability requirements"
      ]
    },
    industryBestPractices: {
      title: "Industry Best Practices",
      description: "General cloud and enterprise architecture standards",
      maxScore: 100,
      criteria: [
        "Enterprise architecture principles followed",
        "Industry-standard patterns and practices applied",
        "Vendor-agnostic design principles considered",
        "Integration and interoperability standards addressed",
        "Data governance and privacy requirements included"
      ]
    },
    internalCompliance: {
      title: "Internal Standards Compliance",
      description: "Organization-specific policies and procedures",
      maxScore: 100,
      criteria: [
        "Internal security policies and standards referenced",
        "Company-specific architectural guidelines followed",
        "Budget and procurement processes addressed",
        "Risk management framework compliance",
        "Change management procedures outlined"
      ]
    }
  };

  const analyzeDocument = () => {
    setIsAnalyzing(true);
    
    // Simulate analysis process with realistic assessment
    setTimeout(() => {
      const mockAnalysis = {
        cloudAdoptionAlignment: {
          score: Math.floor(Math.random() * 30) + 70,
          findings: [
            "Business strategy clearly articulated with cloud-first approach",
            "Migration timeline well-defined with phased approach",
            "Governance framework references Azure Policy implementation",
            "Cost-benefit analysis could be more detailed for executive approval"
          ],
          recommendations: [
            "Include detailed ROI calculations for cloud migration initiative",
            "Define specific Azure Landing Zone configuration parameters",
            "Add compliance mapping to industry standards (ISO 27001, SOC 2)"
          ]
        },
        wellArchitectedAlignment: {
          score: Math.floor(Math.random() * 25) + 75,
          findings: [
            "Security controls well-documented with Zero Trust model implementation",
            "High availability design with multi-region deployment strategy",
            "Cost optimization through reserved instances and right-sizing mentioned",
            "Performance monitoring strategy needs enhancement with specific metrics"
          ],
          recommendations: [
            "Define specific SLA targets and monitoring thresholds (99.9% uptime)",
            "Include comprehensive disaster recovery testing procedures",
            "Add automated scaling policies and performance optimization triggers"
          ]
        },
        industryBestPractices: {
          score: Math.floor(Math.random() * 20) + 80,
          findings: [
            "Follows established enterprise architecture patterns and methodologies",
            "API-first design with standard RESTful interfaces and documentation",
            "Data classification and handling procedures defined per industry standards",
            "Integration patterns align with enterprise service bus architecture"
          ],
          recommendations: [
            "Include explicit reference to TOGAF or similar EA framework",
            "Add comprehensive microservices design patterns documentation",
            "Define API versioning strategy and lifecycle management procedures"
          ]
        },
        internalCompliance: {
          score: Math.floor(Math.random() * 35) + 65,
          findings: [
            "Security policies appropriately referenced with current versions",
            "Change management process outlined following ITIL best practices",
            "Budget considerations included with quarterly review cycles",
            "Risk assessment framework needs strengthening with quantitative metrics"
          ],
          recommendations: [
            "Include detailed risk register with probability and impact assessments",
            "Reference specific internal policy numbers and compliance requirements",
            "Add stakeholder approval workflow diagram with decision points"
          ]
        }
      };

      // Add priority actions based on lowest scores
      const scores = [
        { category: 'Cloud Adoption', score: mockAnalysis.cloudAdoptionAlignment.score },
        { category: 'Well-Architected', score: mockAnalysis.wellArchitectedAlignment.score },
        { category: 'Industry Practices', score: mockAnalysis.industryBestPractices.score },
        { category: 'Internal Compliance', score: mockAnalysis.internalCompliance.score }
      ];

      const lowestScore = Math.min(...scores.map(s => s.score));
      const priorityActions = [];

      if (mockAnalysis.cloudAdoptionAlignment.score === lowestScore) {
        priorityActions.push("Strengthen cloud adoption strategy with detailed business case");
      }
      if (mockAnalysis.wellArchitectedAlignment.score === lowestScore) {
        priorityActions.push("Enhance Well-Architected Framework compliance, focus on monitoring");
      }
      if (mockAnalysis.industryBestPractices.score === lowestScore) {
        priorityActions.push("Align with industry standards and reference frameworks");
      }
      if (mockAnalysis.internalCompliance.score === lowestScore) {
        priorityActions.push("Address internal compliance gaps and policy references");
      }

      mockAnalysis.priorityActions = priorityActions;
      mockAnalysis.overallScore = Math.round(
        (mockAnalysis.cloudAdoptionAlignment.score + 
         mockAnalysis.wellArchitectedAlignment.score + 
         mockAnalysis.industryBestPractices.score + 
         mockAnalysis.internalCompliance.score) / 4
      );

      setAnalysis(mockAnalysis);
      setIsAnalyzing(false);
    }, 3000);
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreIcon = (score) => {
    if (score >= 90) return <CheckCircle className="w-5 h-5 text-green-600" />;
    if (score >= 75) return <AlertCircle className="w-5 h-5 text-yellow-600" />;
    return <AlertCircle className="w-5 h-5 text-red-600" />;
  };

  const getScoreBadgeColor = (score) => {
    if (score >= 90) return 'bg-green-100 text-green-800';
    if (score >= 75) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const getStatusText = (score) => {
    if (score >= 90) return 'Excellent';
    if (score >= 75) return 'Good';
    return 'Needs Improvement';
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setDocument(e.target.result);
        setAnalysis(null);
        // Auto-populate metadata from filename
        const fileName = file.name.replace(/\.[^/.]+$/, "");
        setReportMetadata(prev => ({
          ...prev,
          documentTitle: fileName,
          projectName: fileName.includes('_') ? fileName.split('_')[0] : fileName
        }));
      };
      reader.readAsText(file);
    }
  };

  const generateJSONReport = () => {
    if (!analysis) return null;

    const jsonReport = {
      reportMetadata: {
        assessmentDate: reportMetadata.assessmentDate,
        documentTitle: reportMetadata.documentTitle || "TDA Assessment Document",
        projectName: reportMetadata.projectName || "Technology Assessment Project",
        assessorName: "TDA Copilot Agent",
        organization: reportMetadata.organization || "Enterprise Architecture Team",
        submittedBy: reportMetadata.submittedBy || "Assessment User",
        reportVersion: "1.0",
        assessmentId: `TDA-${new Date().toISOString().split('T')[0]}-${Math.random().toString(36).substr(2, 9)}`
      },
      executiveSummary: {
        overallScore: analysis.overallScore,
        status: getStatusText(analysis.overallScore),
        keyHighlights: [
          "Comprehensive framework assessment completed",
          "Microsoft Cloud Adoption Framework alignment evaluated",
          "Well-Architected Framework principles analyzed",
          "Industry best practices and internal compliance reviewed"
        ],
        criticalIssues: analysis.priorityActions
      },
      detailedAssessment: {
        cloudAdoptionAlignment: {
          score: analysis.cloudAdoptionAlignment.score,
          findings: analysis.cloudAdoptionAlignment.findings,
          recommendations: analysis.cloudAdoptionAlignment.recommendations,
          frameworkReferences: [
            "Strategy methodology - Business justification",
            "Plan methodology - Migration timeline",
            "Ready methodology - Landing zone design"
          ]
        },
        wellArchitectedAlignment: {
          score: analysis.wellArchitectedAlignment.score,
          findings: analysis.wellArchitectedAlignment.findings,
          recommendations: analysis.wellArchitectedAlignment.recommendations,
          pillarBreakdown: {
            reliability: "Multi-region design with availability targets",
            security: "Zero Trust model with comprehensive controls",
            costOptimization: "Reserved instances and right-sizing strategy",
            operationalExcellence: "Monitoring and automation practices",
            performanceEfficiency: "Scalable architecture with optimization"
          }
        },
        industryBestPractices: {
          score: analysis.industryBestPractices.score,
          findings: analysis.industryBestPractices.findings,
          recommendations: analysis.industryBestPractices.recommendations,
          standardsReferences: [
            "TOGAF enterprise architecture framework",
            "RESTful API design standards",
            "ISO 27001 security controls",
            "ITIL service management practices"
          ]
        },
        internalCompliance: {
          score: analysis.internalCompliance.score,
          findings: analysis.internalCompliance.findings,
          recommendations: analysis.internalCompliance.recommendations,
          policyGaps: [
            "Risk management framework alignment",
            "Data retention policy references",
            "Incident response procedure integration"
          ]
        }
      },
      priorityActions: [
        {
          priority: "High",
          action: analysis.priorityActions[0] || "Address highest-scoring framework gaps",
          rationale: "Critical for TDA approval and business alignment",
          estimatedEffort: "2-3 weeks",
          owner: "Architecture Team",
          category: "Framework Alignment"
        }
      ],
      complianceSummary: {
        readyForTDAReview: analysis.overallScore >= 80,
        requiredActionsCount: analysis.priorityActions.length,
        estimatedRemediationTime: analysis.overallScore >= 80 ? "1 week" : "2-3 weeks",
        riskLevel: analysis.overallScore >= 80 ? "Low" : "Medium",
        nextSteps: [
          "Review and implement priority recommendations",
          "Update documentation with missing elements",
          "Schedule follow-up assessment",
          "Prepare for TDA board presentation"
        ]
      }
    };

    return jsonReport;
  };

  const copyJSONToClipboard = () => {
    const jsonReport = generateJSONReport();
    navigator.clipboard.writeText(JSON.stringify(jsonReport, null, 2));
    alert('Assessment JSON copied to clipboard!');
  };

  const downloadJSON = () => {
    const jsonReport = generateJSONReport();
    const blob = new Blob([JSON.stringify(jsonReport, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `TDA_Assessment_${reportMetadata.projectName.replace(/\s+/g, '_')}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex items-center mb-8">
          <Award className="w-8 h-8 text-blue-600 mr-3" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">TDA Pre-Process Copilot Agent</h1>
            <p className="text-gray-600 mt-1">
              Automated alignment assessment with Microsoft Cloud Adoption Framework & Well-Architected Framework
            </p>
          </div>
        </div>

        {/* Metadata Form */}
        <div className="mb-8 bg-blue-50 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Assessment Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Document Title"
              value={reportMetadata.documentTitle}
              onChange={(e) => setReportMetadata({...reportMetadata, documentTitle: e.target.value})}
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              type="text"
              placeholder="Project Name"
              value={reportMetadata.projectName}
              onChange={(e) => setReportMetadata({...reportMetadata, projectName: e.target.value})}
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              type="text"
              placeholder="Submitted By"
              value={reportMetadata.submittedBy}
              onChange={(e) => setReportMetadata({...reportMetadata, submittedBy: e.target.value})}
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              type="text"
              placeholder="Organization"
              value={reportMetadata.organization}
              onChange={(e) => setReportMetadata({...reportMetadata, organization: e.target.value})}
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              type="date"
              value={reportMetadata.assessmentDate}
              onChange={(e) => setReportMetadata({...reportMetadata, assessmentDate: e.target.value})}
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Document Input Section */}
        <div className="mb-8">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
            <div className="text-center">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Upload or Paste Your TDA Document</h3>
              <p className="text-gray-600 mb-4">
                Support for architecture documents, design specifications, and technical proposals
              </p>
              
              <div className="space-y-4">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center mx-auto"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Document
                </button>
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".txt,.doc,.docx,.pdf,.md"
                  onChange={handleFileUpload}
                  className="hidden"
                />

                <div className="text-gray-500">or</div>

                <textarea
                  value={document}
                  onChange={(e) => {
                    setDocument(e.target.value);
                    setAnalysis(null);
                  }}
                  placeholder="Paste your document content here..."
                  className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Analysis Button */}
        {document && (
          <div className="text-center mb-8">
            <button
              onClick={analyzeDocument}
              disabled={isAnalyzing}
              className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center mx-auto"
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                  Analyzing Document...
                </>
              ) : (
                <>
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Analyze Document
                </>
              )}
            </button>
          </div>
        )}

        {/* Analysis Results */}
        {analysis && (
          <div className="space-y-6">
            {/* Overall Score */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Overall Alignment Score</h2>
                  <p className="text-gray-600">Composite score across all assessment categories</p>
                </div>
                <div className="text-right">
                  <div className={`text-4xl font-bold ${getScoreColor(analysis.overallScore)}`}>
                    {analysis.overallScore}%
                  </div>
                  <div className="flex items-center justify-end mt-1">
                    {getScoreIcon(analysis.overallScore)}
                    <span className="ml-1 text-sm text-gray-600">
                      {getStatusText(analysis.overallScore)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Analysis */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {Object.entries(analysis).filter(([key]) => key !== 'priorityActions' && key !== 'overallScore').map(([key, result]) => {
                const criteria = scoringCriteria[key];
                if (!criteria) return null;
                
                return (
                  <div key={key} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{criteria.title}</h3>
                        <p className="text-sm text-gray-600">{criteria.description}</p>
                      </div>
                      <div className="text-right">
                        <div className={`text-2xl font-bold ${getScoreColor(result.score)}`}>
                          {result.score}%
                        </div>
                        {getScoreIcon(result.score)}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                          <Info className="w-4 h-4 mr-1 text-blue-600" />
                          Key Findings
                        </h4>
                        <ul className="space-y-1">
                          {result.findings.map((finding, index) => (
                            <li key={index} className="text-sm text-gray-700 flex items-start">
                              <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                              {finding}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                          <TrendingUp className="w-4 h-4 mr-1 text-orange-600" />
                          Recommendations
                        </h4>
                        <ul className="space-y-1">
                          {result.recommendations.map((rec, index) => (
                            <li key={index} className="text-sm text-gray-700 flex items-start">
                              <span className="w-1.5 h-1.5 bg-orange-600 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                              {rec}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Priority Actions */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <AlertCircle className="w-6 h-6 mr-2 text-orange-600" />
                Priority Actions Required
              </h2>
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                <p className="text-sm text-gray-600 mb-3">
                  The following actions should be addressed before TDA approval:
                </p>
                <ol className="space-y-2">
                  {analysis.priorityActions.map((action, index) => (
                    <li key={index} className="flex items-start">
                      <span className="bg-orange-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 flex-shrink-0 mt-0.5">
                        {index + 1}
                      </span>
                      <span className="text-gray-800">{action}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* JSON Export Section */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <FileCheck className="w-6 h-6 mr-2 text-blue-600" />
                Export Assessment Data
              </h2>
              <p className="text-gray-600 mb-4">
                Generate structured assessment data for PDF reports, documentation, or integration with other systems.
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={copyJSONToClipboard}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Copy JSON Data
                </button>
                <button
                  onClick={downloadJSON}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download JSON
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center space-x-4 pt-6 border-t border-gray-200">
              <button 
                onClick={() => {
                  setDocument('');
                  setAnalysis(null);
                  setReportMetadata({
                    documentTitle: '',
                    projectName: '',
                    submittedBy: '',
                    organization: '',
                    assessmentDate: new Date().toISOString().split('T')[0]
                  });
                }}
                className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Reset Analysis
              </button>
            </div>
          </div>
        )}

        {/* Framework Information */}
        {!analysis && (
          <div className="mt-8 bg-blue-50 rounded-lg p-6 border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">Assessment Framework</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-blue-800 mb-2">Microsoft Cloud Adoption Framework</h4>
                <p className="text-sm text-blue-700">
                  Structured approach to help organizations plan, build and optimize their cloud environments 
                  with methodology covering Strategy, Plan, Ready, Adopt, Govern, and Manage phases.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-blue-800 mb-2">Well-Architected Framework</h4>
                <p className="text-sm text-blue-700">
                  Five pillars of reliability, cost optimization, operational excellence, performance efficiency, 
                  and security for building high-quality workloads.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TDACopilotAgent;