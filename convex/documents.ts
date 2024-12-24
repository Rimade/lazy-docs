import { ConvexError, v } from 'convex/values';
import { mutation, query } from './_generated/server';
import { paginationOptsValidator } from 'convex/server';

export const get = query({
	args: { paginationOpts: paginationOptsValidator, search: v.optional(v.string()) },
	handler: async (ctx, { search, paginationOpts }) => {
		const user = await ctx.auth.getUserIdentity();
		if (!user) throw new ConvexError('Unauthorized');

		if (search) {
			return await ctx.db
				.query('documents')
				.withSearchIndex('search_title', (q) =>
					q.search('title', search).eq('ownerId', user.subject)
				)
				.paginate(paginationOpts);
		}

		return await ctx.db
			.query('documents')
			.withIndex('by_owner_id', (q) => q.eq('ownerId', user.subject))
			.paginate(paginationOpts);
	},
});

export const create = mutation({
	args: {
		title: v.optional(v.string()),
		initialContent: v.optional(v.string()),
	},
	handler: async (ctx, args) => {
		const user = await ctx.auth.getUserIdentity();
		if (!user) throw new Error('User not found');

		return await ctx.db.insert('documents', {
			title: args.title ?? 'Untitled Document',
			initialContent: args.initialContent,
			ownerId: user.subject,
		});
	},
});

export const updateById = mutation({
	args: {
		id: v.id('documents'),
		title: v.string(),
	},
	handler: async ({ db, auth }, { id, title }) => {
		const user = await auth.getUserIdentity();
		if (!user) throw new ConvexError('Unauthorized');

		const document = await db.get(id);

		if (!document) throw new ConvexError('Document not found');
		if (document.ownerId !== user.subject) throw new ConvexError('Unauthorized');

		return await db.patch(id, {
			title,
		});
	},
});

export const removeById = mutation({
	args: {
		id: v.id('documents'),
	},
	handler: async ({ db, auth }, { id }) => {
		const user = await auth.getUserIdentity();
		if (!user) throw new ConvexError('Unauthorized');

		const document = await db.get(id);

		if (!document) throw new ConvexError('Document not found');
		if (document.ownerId !== user.subject) throw new ConvexError('Unauthorized');

		return await db.delete(id);
	},
});
