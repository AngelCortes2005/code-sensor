'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, FileText, FileCode, Loader2 } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { exportToPDF, exportToMarkdown, downloadMarkdown } from '@/lib/exportUtils';

interface ExportButtonProps {
  repository: {
    name: string;
    full_name: string;
    description: string | null;
    language: string | null;
  };
  analysis: {
    quality_score: number;
    security_score: number;
    structure_score: number;
    overall_score: number;
    analysis_data: any;
    created_at: string;
  };
}

export function ExportButton({ repository, analysis }: ExportButtonProps) {
  const [exporting, setExporting] = useState(false);

  const handleExportPDF = async () => {
    setExporting(true);
    try {
      await exportToPDF(repository, analysis);
    } catch (error) {
      console.error('Error exporting PDF:', error);
      alert('Failed to export PDF. Please try again.');
    } finally {
      setExporting(false);
    }
  };

  const handleExportMarkdown = () => {
    setExporting(true);
    try {
      const markdown = exportToMarkdown(repository, analysis);
      downloadMarkdown(markdown, repository.name);
    } catch (error) {
      console.error('Error exporting Markdown:', error);
      alert('Failed to export Markdown. Please try again.');
    } finally {
      setExporting(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          disabled={exporting}
          className="border-gray-800 hover:border-CodeSensor-Primary/50 bg-transparent text-white"
        >
          {exporting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Exporting...
            </>
          ) : (
            <>
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 bg-gray-900 border-gray-800">
        <DropdownMenuItem
          onClick={handleExportPDF}
          className="cursor-pointer text-white hover:bg-gray-800 focus:bg-gray-800"
        >
          <FileText className="w-4 h-4 mr-2 text-red-400" />
          Export as PDF
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleExportMarkdown}
          className="cursor-pointer text-white hover:bg-gray-800 focus:bg-gray-800"
        >
          <FileCode className="w-4 h-4 mr-2 text-blue-400" />
          Export as Markdown
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
