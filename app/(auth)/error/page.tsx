'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Home, RefreshCw } from 'lucide-react';

const errorMessages: Record<string, { title: string; description: string }> = {
	Configuration: {
		title: 'Server Configuration Error',
		description: 'There is a problem with the server configuration. Please contact support.',
	},
	AccessDenied: {
		title: 'Access Denied',
		description:
			'You do not have permission to sign in. Please contact an administrator if you believe this is an error.',
	},
	Verification: {
		title: 'Verification Failed',
		description: 'The verification token has expired or has already been used.',
	},
	OAuthSignin: {
		title: 'OAuth Sign In Error',
		description: 'An error occurred during the OAuth sign in process. Please try again.',
	},
	OAuthCallback: {
		title: 'OAuth Callback Error',
		description: 'An error occurred during the OAuth callback. Please try again.',
	},
	OAuthCreateAccount: {
		title: 'Account Creation Error',
		description: 'Could not create your OAuth account. Please try again or contact support.',
	},
	EmailCreateAccount: {
		title: 'Email Account Error',
		description: 'Could not create your email account. Please try again.',
	},
	Callback: {
		title: 'Callback Error',
		description: 'An error occurred during the authentication callback. Please try again.',
	},
	Default: {
		title: 'Authentication Error',
		description: 'An unexpected error occurred during authentication. Please try again.',
	},
};

function ErrorContent() {
	const searchParams = useSearchParams();
	const error = searchParams.get('error') || 'Default';

	const errorInfo = errorMessages[error] || errorMessages.Default;

	return (
		<div className="min-h-screen bg-gradient-to-b from-slate-950 to-black flex items-center justify-center px-4">
			<div className="max-w-md w-full space-y-8">
				<div className="flex justify-center">
					<div className="relative">
						<div className="absolute inset-0 bg-red-500/20 rounded-full blur-2xl" />
						<div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-red-500/20 to-red-600/20 border border-red-500/30 flex items-center justify-center">
							<AlertTriangle className="w-10 h-10 text-red-500" />
						</div>
					</div>
				</div>

				<div className="text-center space-y-4">
					<h1 className="text-3xl font-bold text-white">{errorInfo.title}</h1>
					<p className="text-lg text-gray-400">{errorInfo.description}</p>

					<div className="inline-block px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20">
						<span className="text-sm font-mono text-red-400">Error Code: {error}</span>
					</div>
				</div>

				<div className="space-y-3">
					<Button
						asChild
						size="lg"
						className="w-full bg-gradient-to-r from-[#019A8E] to-CodeSensor-Primary hover:opacity-90"
					>
						<Link href="/signin">
							<RefreshCw className="w-5 h-5 mr-2" />
							Try Again
						</Link>
					</Button>

					<Button
						asChild
						size="lg"
						variant="outline"
						className="w-full border-gray-700 hover:bg-gray-800/50"
					>
						<Link href="/">
							<Home className="w-5 h-5 mr-2" />
							Back to Home
						</Link>
					</Button>
				</div>

				<div className="mt-8 p-4 rounded-lg bg-gray-900/50 border border-gray-800 text-center">
					<p className="text-sm text-gray-400">
						Need help? Contact us at{' '}
						<a
							href="mailto:support@codesensor.com"
							className="text-CodeSensor-Primary hover:underline"
						>
							support@codesensor.com
						</a>
					</p>
				</div>

				{process.env.NODE_ENV === 'development' && (
					<div className="mt-4 p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
						<p className="text-xs text-yellow-400 font-mono text-center">
							Development Mode: Check server logs for detailed error information
						</p>
					</div>
				)}
			</div>
		</div>
	);
}

export default function AuthErrorPage() {
	return (
		<Suspense
			fallback={
				<div className="min-h-screen bg-gradient-to-b from-slate-950 to-black flex items-center justify-center">
					<div className="text-gray-400">Loading...</div>
				</div>
			}
		>
			<ErrorContent />
		</Suspense>
	);
}