<template>
  <el-config-provider namespace="ep">
    <BaseHeader />
    <div class="flex main-container">
      <BaseSide />
      <div w="full" m="1.5" bg-white>
        <BasicTable msg="Hello Vue 3 + Element Plus + Vite" />
      </div>
    </div>
  </el-config-provider>
</template>

<style>
#app {
  text-align: center;
  color: var(--ep-text-color-primary);
  background: #f0f2f5;
}

.main-container {
  height: calc(100vh - var(--ep-menu-item-height) - 3px);
}

::-webkit-scrollbar-track-piece {
  background-color: transparent;
}
::-webkit-scrollbar {
  width: 7px;
  height: 7px;
  background-color: transparent;
}
::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background-color: hsla(220, 4%, 58%, 0.3);
}
</style>
