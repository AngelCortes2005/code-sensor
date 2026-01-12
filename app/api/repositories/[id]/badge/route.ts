import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/serverClient';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const repositoryId = parseInt(id);

    if (isNaN(repositoryId)) {
      return new NextResponse('Invalid repository ID', { status: 400 });
    }

    // Get latest analysis for the repository
    const { data: analysis, error } = await supabaseAdmin
      .from('repository_analyses')
      .select('overall_score, created_at')
      .eq('repository_id', repositoryId)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error || !analysis) {
      return createBadge('CodeSensor', 'No Analysis', '#6B7280');
    }

    const score = analysis.overall_score;
    let color = '#10B981'; // green
    let label = 'Excellent';

    if (score < 50) {
      color = '#EF4444'; // red
      label = 'Needs Work';
    } else if (score < 70) {
      color = '#F59E0B'; // orange
      label = 'Fair';
    } else if (score < 90) {
      color = '#3B82F6'; // blue
      label = 'Good';
    }

    return createBadge('Code Quality', `${score}/100 - ${label}`, color);

  } catch (error) {
    console.error('Error generating badge:', error);
    return createBadge('CodeSensor', 'Error', '#EF4444');
  }
}

function createBadge(label: string, value: string, color: string): NextResponse {
  const labelWidth = measureText(label) + 10;
  const valueWidth = measureText(value) + 10;
  const totalWidth = labelWidth + valueWidth;

  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${totalWidth}" height="20">
  <linearGradient id="b" x2="0" y2="100%">
    <stop offset="0" stop-color="#bbb" stop-opacity=".1"/>
    <stop offset="1" stop-opacity=".1"/>
  </linearGradient>
  
  <mask id="a">
    <rect width="${totalWidth}" height="20" rx="3" fill="#fff"/>
  </mask>
  
  <g mask="url(#a)">
    <path fill="#555" d="M0 0h${labelWidth}v20H0z"/>
    <path fill="${color}" d="M${labelWidth} 0h${valueWidth}v20H${labelWidth}z"/>
    <path fill="url(#b)" d="M0 0h${totalWidth}v20H0z"/>
  </g>
  
  <g fill="#fff" text-anchor="middle" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="11">
    <text x="${labelWidth / 2}" y="15" fill="#010101" fill-opacity=".3">${label}</text>
    <text x="${labelWidth / 2}" y="14">${label}</text>
    <text x="${labelWidth + valueWidth / 2}" y="15" fill="#010101" fill-opacity=".3">${value}</text>
    <text x="${labelWidth + valueWidth / 2}" y="14">${value}</text>
  </g>
</svg>
  `.trim();

  return new NextResponse(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'max-age=300, s-maxage=300, stale-while-revalidate=600',
    },
  });
}

function measureText(text: string): number {
  // Approximate character width for the badge font
  return text.length * 6;
}
