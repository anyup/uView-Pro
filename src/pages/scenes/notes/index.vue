<template>
    <demo-page hide-tabs title="我的笔记" desc="记录你的想法，随时查看。" :nav-back="true">
        <view class="notes-container">
            <!-- 添加笔记按钮 -->
            <view class="add-button-section">
                <u-button type="primary" @click="addNote" icon="plus" shape="circle"> 新建笔记 </u-button>
            </view>

            <!-- 搜索框 -->
            <view class="search-section">
                <u-search v-model="searchText" placeholder="搜索笔记..." :show-action="false" shape="round"></u-search>
            </view>

            <!-- 笔记列表 -->
            <view class="notes-list">
                <view v-if="filteredNotes.length === 0" class="empty-state">
                    <u-empty
                        mode="data"
                        :text="searchText ? '未找到相关笔记' : '暂无笔记，点击上方按钮创建'"
                        :show-empty="true"
                    ></u-empty>
                </view>

                <view v-for="note in filteredNotes" :key="note.id" class="note-card" @click="editNote(note)">
                    <view class="note-header">
                        <view class="note-title">{{ note.title || '无标题' }}</view>
                        <view class="note-time">{{ formatTime(note.updatedAt) }}</view>
                    </view>
                    <view class="note-content">{{ note.content || '无内容' }}</view>
                    <view class="note-footer">
                        <u-tag v-if="note.tag" :text="note.tag" size="mini" type="primary" plain></u-tag>
                        <view class="note-actions" @click.stop="deleteNote(note.id)">
                            <u-icon name="trash" size="36" color="var(--u-type-error)"></u-icon>
                        </view>
                    </view>
                </view>
            </view>

            <!-- 添加/编辑笔记弹窗 -->
            <u-popup v-model="showAddModal" mode="bottom" height="80%" border-radius="20">
                <view class="note-editor">
                    <view class="editor-header">
                        <u-button type="error" size="mini" plain @click="showAddModal = false">取消</u-button>
                        <view class="editor-title">{{ currentNote ? '编辑笔记' : '新建笔记' }}</view>
                        <u-button type="primary" size="mini" @click="saveNote">保存</u-button>
                    </view>
                    <view class="editor-body">
                        <u-gap height="20px"></u-gap>
                        <u-input
                            v-model="noteForm.title"
                            placeholder="笔记标题"
                            :border="true"
                            :clearable="true"
                        ></u-input>
                        <u-gap height="30px"></u-gap>
                        <u-textarea
                            v-model="noteForm.content"
                            placeholder="开始记录你的想法..."
                            :auto-height="true"
                            :maxlength="2000"
                            height="200rpx"
                            :count="true"
                        ></u-textarea>
                        <u-gap height="30px"></u-gap>
                        <view class="tag-section">
                            <view class="tag-label">标签：</view>
                            <u-tag
                                v-for="tag in tags"
                                :key="tag"
                                :text="tag"
                                :type="noteForm.tag === tag ? 'primary' : 'info'"
                                @click="noteForm.tag = noteForm.tag === tag ? '' : tag"
                                style="margin-right: 12rpx"
                            ></u-tag>
                        </view>
                    </view>
                </view>
            </u-popup>
        </view>
    </demo-page>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { $u } from '@/uni_modules/uview-pro';

interface Note {
    id: string;
    title: string;
    content: string;
    tag: string;
    createdAt: number;
    updatedAt: number;
}

const STORAGE_KEY = 'uview-notes-list';

const notes = ref<Note[]>([]);
const searchText = ref('');
const showAddModal = ref(false);
const currentNote = ref<Note | null>(null);

const noteForm = ref({
    title: '',
    content: '',
    tag: ''
});

const tags = ['工作', '生活', '学习', '灵感', '其他'];

// 筛选后的笔记列表
const filteredNotes = computed(() => {
    let result = notes.value;
    if (searchText.value) {
        const keyword = searchText.value.toLowerCase();
        result = result.filter(
            note =>
                note.title.toLowerCase().includes(keyword) ||
                note.content.toLowerCase().includes(keyword) ||
                note.tag.toLowerCase().includes(keyword)
        );
    }
    return result.sort((a, b) => b.updatedAt - a.updatedAt);
});

// 格式化时间
function formatTime(timestamp: number) {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        if (hours === 0) {
            const minutes = Math.floor(diff / (1000 * 60));
            return minutes <= 0 ? '刚刚' : `${minutes}分钟前`;
        }
        return `${hours}小时前`;
    } else if (days === 1) {
        return '昨天';
    } else if (days < 7) {
        return `${days}天前`;
    } else {
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return `${month}月${day}日`;
    }
}

// 加载笔记
function loadNotes() {
    try {
        const stored = uni.getStorageSync(STORAGE_KEY);
        if (stored && Array.isArray(stored)) {
            notes.value = stored;
        }
    } catch (error) {
        console.warn('loadNotes error', error);
    }
}

// 保存笔记
function saveNotes() {
    try {
        uni.setStorageSync(STORAGE_KEY, notes.value);
    } catch (error) {
        console.warn('saveNotes error', error);
    }
}

// 保存笔记
function saveNote() {
    const { title, content, tag } = noteForm.value;
    if (!title.trim() && !content.trim()) {
        $u.toast('请输入标题或内容', 'warning');
        return;
    }

    const now = Date.now();
    if (currentNote.value) {
        // 编辑现有笔记
        const note = notes.value.find(n => n.id === currentNote.value!.id);
        if (note) {
            note.title = title;
            note.content = content;
            note.tag = tag;
            note.updatedAt = now;
        }
    } else {
        // 创建新笔记
        const newNote: Note = {
            id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
            title: title || '无标题',
            content,
            tag,
            createdAt: now,
            updatedAt: now
        };
        notes.value.unshift(newNote);
    }

    saveNotes();
    resetForm();
    showAddModal.value = false;
    $u.toast(currentNote.value ? '保存成功' : '创建成功', 'success');
}

function addNote() {
    resetForm();
    showAddModal.value = true;
}

// 编辑笔记
function editNote(note: Note) {
    currentNote.value = note;
    noteForm.value = {
        title: note.title,
        content: note.content,
        tag: note.tag
    };
    showAddModal.value = true;
}

// 删除笔记
function deleteNote(id: string) {
    uni.showModal({
        title: '确认删除',
        content: '确定要删除这条笔记吗？',
        success: res => {
            if (res.confirm) {
                notes.value = notes.value.filter(n => n.id !== id);
                saveNotes();
                $u.toast('删除成功', 'success');
            }
        }
    });
}

// 重置表单
function resetForm() {
    currentNote.value = null;
    noteForm.value = {
        title: '',
        content: '',
        tag: ''
    };
}

onMounted(() => {
    loadNotes();
});
</script>

<style lang="scss" scoped>
.notes-container {
    padding: 24rpx;
    min-height: 100vh;
    background: linear-gradient(180deg, rgba(41, 121, 255, 0.02) 0%, transparent 100%);
}

.add-button-section {
    margin-bottom: 24rpx;
}

.search-section {
    margin-bottom: 24rpx;
}

.notes-list {
    display: flex;
    flex-direction: column;
    gap: 20rpx;
}

.note-card {
    padding: 24rpx;
    background: var(--u-bg-color);
    border-radius: 16rpx;
    box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;

    &:active {
        transform: scale(0.98);
    }
}

.note-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16rpx;
}

.note-title {
    font-size: 32rpx;
    font-weight: 600;
    color: var(--u-main-color);
    flex: 1;
}

.note-time {
    font-size: 22rpx;
    color: var(--u-tips-color);
}

.note-content {
    font-size: 26rpx;
    color: var(--u-content-color);
    line-height: 1.6;
    margin-bottom: 16rpx;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
}

.note-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.note-actions {
    display: flex;
    gap: 16rpx;
}

.empty-state {
    padding: 100rpx 0;
}

.note-editor {
    height: 100%;
    display: flex;
    flex-direction: column;
}

.editor-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24rpx;
    border-bottom: 1rpx solid var(--u-border-color);
}

.editor-title {
    font-size: 32rpx;
    font-weight: 600;
    color: var(--u-main-color);
}

.editor-body {
    flex: 1;
    padding: 24rpx;
    overflow-y: auto;
}

.tag-section {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 12rpx;
}

.tag-label {
    font-size: 26rpx;
    color: var(--u-content-color);
    margin-right: 12rpx;
}
</style>
