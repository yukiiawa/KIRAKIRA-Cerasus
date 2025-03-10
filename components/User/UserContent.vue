<docs>
	# 用户内容
	使用统一的组件显示用户发送的内容或者显示用户信息，包括头像、昵称、用户名、签名等信息。
	用于评论、通知、个人主页、视频页显示作者等场景。
</docs>

<script setup lang="ts">
	import { LocaleLink } from "#components";
	// import makeFullwidth from "pomsky/fullwidth.pom";

	const props = defineProps<{
		/** 头像网址。 */
		avatar?: string;
		/** 用户 UID。 */
		uid?: number;
		/** 用户昵称。 */
		nickname?: string;
		/** 用户名。 */
		username?: string;
		/** 用户备注。 */
		memo?: string;
		/** 性别。 */
		gender?: string;
		/** 日期。 */
		date?: Date;
		/** 序号。 */
		index?: number;
		/** 是否置顶。 */
		pinned?: boolean;
		/** 整个组件的超链接目标地址，优先级高于 UID（用于比如自己个人主页点击后直接跳转至资料设置）。 */
		to?: string;

		/** 大小。 */
		size?: "large" | "huge";
		/** 是否垂直居中。 */
		center?: boolean;
	}>();

	const slots = useSlots();

	// TODO: 显示备注用户，待后端功能实现。

	// const fullwidthRegexp = makeFullwidth();

	// // 验证是否是加上全宽括弧而不是半宽括弧，条件是包含至少一个非谚文的全宽字符。
	// const memoParen = computed(() => {
	// 	const memo = user.value?.memo ?? "";
	// 	return !memo.trim() ? "" :
	// 		fullwidthRegexp.exec(memo) ? "fullwidth" : "halfwidth";
	// });
</script>

<template>
	<Comp :class="{ large: size === 'large', huge: size === 'huge', center, 'link-full': to }">
		<Transition>
			<div v-if="pinned" class="pinned">
				<Icon v-tooltip:bottom="t.pinned" name="pin" />
			</div>
		</Transition>

		<slot name="avatar">
			<UserAvatar :avatar :uid :to />
		</slot>

		<component :is="to ? LocaleLink : 'div'" class="container link lite" :to>
			<div class="info">
				<component :is="uid ? LocaleLink : 'div'" v-if="nickname || username" :to="uid ? `/user/${uid ?? ''}` : undefined" class="names lite">
					<span class="nickname">{{ nickname }}</span>
					<span class="username">@{{ username }}</span>
					<!-- <span v-if="memoParen" class="memo" :class="[memoParen]">{{ memo }}</span> -->
				</component>

				<div class="icons">
					<Icon v-if="gender === 'male' " name="male" class="male" />
					<Icon v-else-if="gender === 'female'" name="female" class="female" />
					<slot name="icons"></slot>
				</div>
			</div>

			<p v-if="slots.description" class="description">
				<slot name="description"></slot>
			</p>

			<div v-if="slots.default" class="content">
				<slot></slot>
			</div>

			<div v-if="slots.quote" class="quote">
				<Icon name="quote_start" />
				<span><slot name="quote"></slot></span>
			</div>

			<div v-if="date || slots.footerLeft || slots.footerRight" class="footer">
				<div class="left">
					<span v-if="index">#{{ index }}</span>
					<span v-if="date"><DateTime :dateTime="date" showTime /></span>
					<slot name="footerLeft"></slot>
				</div>

				<div class="right">
					<slot name="footerRight"></slot>
				</div>
			</div>

		</component>
	</Comp>
</template>

<style scoped lang="scss">
	:comp {
		position: relative;
		display: flex;
		min-width: 0;

		&.center {
			align-items: center;
		}

		* {
			user-select: text;
		}

		&.link-full:any-hover {
			.user-avatar {
				--hover: true;
			}

			* {
				color: c(accent) !important;
			}
		}

		/* 头像 hover 的时候也显示名字 hover 效果。 */
		&:has(.user-avatar:any-hover) a.names > * {
			color: c(accent);
		}

		/* 在带链接的名字 hover 的时候也显示头像 hover 效果。 */
		&:has(a.names:any-hover) .user-avatar {
			--hover: true;
		}
	}

	/* 带有链接的名字在 hover 时候变色。 */
	a.names:any-hover > * {
		color: c(accent) !important;
	}

	.container {
		display: flex;
		flex-direction: column;
		gap: 8px;
		width: 100%;
		min-width: 0;
		padding-left: 16px;
		user-select: text;

		:comp.large &,
		:comp.huge & {
			gap: 4px;
		}

		:comp.center & {
			padding-left: 12px;
		}
	}

	.pinned {
		flex-shrink: 0;
		width: 18px;
		margin-right: 8px;
		color: c(icon-color);
		font-size: 18px;

		&.v-enter-from,
		&.v-leave-to {
			width: 0;
			margin-right: 0;
			transform: translateX(-26px);
			opacity: 0;
		}
	}

	.user-avatar {
		@include square(48px);

		:comp.large & {
			@include square(58px);
		}

		:comp.huge & {
			@include square(64px);
		}
	}

	.info {
		display: flex;
		gap: 6px;
		align-items: center;
		margin-bottom: -2px;

		:comp.large & {
			gap: 4px;
			margin-bottom: 0;
			font-size: 18px;
		}

		:comp.huge & {
			gap: 10px;
			margin-bottom: 0;
			font-size: 24px;
		}

		.names {
			display: flex;
			gap: 4px;
			align-items: center;
			width: fit-content;
			overflow: hidden;

			> * {
				overflow: hidden;
				line-height: 18px;
				white-space: nowrap;
				text-overflow: ellipsis;

				:comp.large & {
					line-height: 25px;
				}

				:comp.huge & {
					line-height: 34px;
				}
			}

			.nickname {
				color: c(text-color);
				font-weight: bold;
			}

			.username {
				color: c(icon-color);
			}

			// .memo {
			// 	color: c(icon-color);

			// 	&.fullwidth {
			// 		&::before {
			// 			content: "（";
			// 		}

			// 		&::after {
			// 			content: "）";
			// 		}
			// 	}

			// 	&.halfwidth {
			// 		&::before {
			// 			content: "\a0(";
			// 		}

			// 		&::after {
			// 			content: ")\a0";
			// 		}
			// 	}
			// }
		}

		.icons {
			display: flex;
			gap: 2px;
			align-items: center;
			color: c(icon-color);
			font-size: 18px;

			:comp.huge & {
				font-size: 24px;
			}

			.male {
				color: c(blue);
			}

			.female {
				color: c(pink);
			}
		}
	}

	.description {
		overflow: hidden;
		color: c(icon-color);
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.content {
		line-height: 1.5;
	}

	.quote {
		@include round-small;
		display: flex;
		gap: 4px;
		align-items: center;
		padding: 4px;
		overflow: hidden;
		color: c(icon-color);
		font-size: 12px;
		background-color: c(gray-10);

		> .icon {
			font-size: 16px;
		}

		> span,
		> span:deep(> *) {
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
			hyphens: auto;
		}
	}

	.footer {
		display: flex;
		gap: 8px;
		align-items: center;
		height: 36px;
		margin: -8px 0;
		margin-left: 0;
		color: c(icon-color);
		font-size: 12px;

		> * {
			display: flex;
			flex-shrink: 0;
			flex-wrap: wrap;
			align-items: center;
		}

		.left {
			gap: 12px;
		}

		.right {
			margin-left: auto;

			&:has(.soft-button) {
				margin-right: -8px;
			}
		}

		:deep(.soft-button) {
			--wrapper-size: 36px;
			--ripple-size: var(--wrapper-size);
			--icon-size: 20px;
		}
	}
</style>
