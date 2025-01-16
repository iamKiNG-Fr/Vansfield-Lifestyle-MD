<template>
  <div>
    <section
      class="buttons flex items-center flex-wrap gap-x-4 border border-teal-700 p-4 rounded-t-xl bg-teal-700 text-gray-50"
      v-if="editor"
    >
      <button
        :disabled="!editor.can().chain().focus().toggleBold().run()"
        :class="{ 'tt-is-active': editor.isActive('bold') }"
        @click="editor.chain().focus().toggleBold().run()"
      >
        <UIcon
          name="material-symbols:format-bold"
          class="text-2xl"
          dynamic=""
        />
      </button>
      <button
        :disabled="!editor.can().chain().focus().toggleItalic().run()"
        :class="{ 'tt-is-active': editor.isActive('italic') }"
        @click="editor.chain().focus().toggleItalic().run()"
      >
        <UIcon
          name="material-symbols:format-italic-rounded"
          class="text-2xl"
          dynamic
        />
      </button>
      <button
        :class="{ 'tt-is-active': editor.isActive('underline') }"
        @click="editor.chain().focus().setUnderline().run()"
      >
        <UIcon
          name="material-symbols:format-underlined-rounded"
          class="text-2xl"
          dynamic=""
        />
      </button>
      <button
        :class="{ 'tt-is-active': editor.isActive('paragraph') }"
        @click="editor.chain().focus().setParagraph().run()"
      >
        <UIcon
          name="material-symbols:format-paragraph-rounded"
          class="text-2xl"
          dynamic=""
        />
      </button>
      <button
        :class="{
          'tt-is-active': editor.isActive('heading', { level: 1 }),
        }"
        @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
      >
        <UIcon
          name="material-symbols:format-h1-rounded"
          class="text-2xl"
          dynamic=""
        />
      </button>
      <button
        :class="{
          'tt-is-active': editor.isActive('heading', { level: 2 }),
        }"
        @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
      >
        <UIcon
          name="material-symbols:format-h2-rounded"
          class="text-2xl"
          dynamic=""
        />
      </button>
      <button
        :class="{
          'tt-is-active': editor.isActive('heading', { level: 3 }),
        }"
        @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
      >
        <UIcon
          name="material-symbols:format-h3-rounded"
          class="text-2xl"
          dynamic=""
        />
      </button>
      <button
        :class="{ 'tt-is-active': editor.isActive('bulletList') }"
        @click="editor.chain().focus().toggleBulletList().run()"
      >
        <UIcon
          name="material-symbols:format-list-bulleted"
          class="text-2xl"
          dynamic=""
        />
      </button>
      <button
        :class="{ 'tt-is-active': editor.isActive('orderedList') }"
        @click="editor.chain().focus().toggleOrderedList().run()"
      >
        <UIcon
          name="material-symbols:format-list-numbered-rounded"
          class="text-2xl"
          dynamic=""
        />
      </button>
      <button
        :class="{ 'tt-is-active': editor.isActive('blockquote') }"
        @click="editor.chain().focus().toggleBlockquote().run()"
      >
        <UIcon
          name="material-symbols:format-quote"
          class="text-2xl"
          dynamic=""
        />
      </button>
      <button @click="editor.chain().focus().setHorizontalRule().run()">
        <UIcon
          name="material-symbols:horizontal-rule-rounded"
          class="text-2xl"
          dynamic=""
        />
      </button>
      <button
        :disabled="!editor.can().chain().focus().undo().run()"
        @click="editor.chain().focus().undo().run()"
      >
        <UIcon
          name="material-symbols:undo-rounded"
          class="text-2xl"
          dynamic=""
        />
      </button>
      <button
        :disabled="!editor.can().chain().focus().redo().run()"
        @click="editor.chain().focus().redo().run()"
      >
        <UIcon
          name="material-symbols:redo-rounded"
          class="text-2xl"
          dynamic=""
        />
      </button>
    </section>
    <TiptapEditorContent :editor="editor" />
  </div>
</template>

<script setup>
import Underline from "@tiptap/extension-underline";

const props = defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue"]);
const mm = ref()

const editor = useEditor({
  content: props.modelValue,
  onUpdate: ({editor})=>{
     // Emit the updated content whenever the editor changes
     emit("update:modelValue", editor.getHTML());
  },
  extensions: [TiptapStarterKit, Underline],
  editorProps: {
    attributes: {
      class:
        "border border-teal-700 p-4 min-h-[12rem] max-h-[12rem] overflow-y-auto outline-none prose max-w-none rounded-b-xl border-3",
    },
  },
});

// Watch for changes in `modelValue` and update the editor's content
watch(
  () => props.modelValue,
  (newValue) => {
    if (editor.value && editor.value.getHTML() !== newValue) {
      editor.value.commands.setContent(newValue || ""); // Update the editor content
    }
  }
);


onBeforeUnmount(() => {
  unref(editor).destroy();
});
</script>

<style scoped></style>
