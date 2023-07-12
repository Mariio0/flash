'use client';

import {
	Toast,
	ToastClose,
	ToastDescription,
	ToastProvider,
	ToastTitle,
	ToastViewport,
} from '@/components/ui/toast';
import { useToast } from '@/components/ui/use-toast';

export function Toaster() {
	const { toasts } = useToast();

	return (
		<ToastProvider>
			{toasts.map(function ({ id, title, description, action, ...props }) {
				return (
					<Toast
						key={id}
						{...props}
						className='bg-slate-50 relative top-6 sm:top-0 border border-cl4'
					>
						<div className='grid gap-1 z-50 text-cl4'>
							{title && <ToastTitle className='sm:text-lg'>{title}</ToastTitle>}
							{description && (
								<ToastDescription className='sm:text-lg'>
									{description}
								</ToastDescription>
							)}
						</div>
						{action}
						<ToastClose className='text-cl4' />
					</Toast>
				);
			})}
			<ToastViewport />
		</ToastProvider>
	);
}
