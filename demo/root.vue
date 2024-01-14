<template>

  <div>
    <div>
      <ZButton @click="handleClick">测试按钮</ZButton>
      <ZButton type="primary" loading>primary</ZButton>
      <ZButton type="success">success</ZButton>
      <ZButton type="info">info</ZButton>
      <ZButton type="warning">warning</ZButton>
      <ZButton type="danger">danger</ZButton>
    </div>
    <div>
      <ZButton plain>测试按钮</ZButton>
      <ZButton type="primary" plain loading>primary</ZButton>
      <ZButton type="success" plain disabled>success</ZButton>
      <ZButton type="info" plain shape="round">info</ZButton>
      <ZButton type="warning" plain size="small">warning</ZButton>
      <ZButton type="danger" plain size="large" disabled>danger</ZButton>
    </div>
  </div>
<!--  <button>测试</button>-->
</template>
<script setup lang="ts">
const handleClick = (e:MouseEvent) => {
  console.log(e)
}

</script>