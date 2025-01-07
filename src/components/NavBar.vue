<template>
    <div @click="toggleDropdown" class="flex justify-end px-8 py-5 bg-white border-b border-b-[#f5f5f5]">
        <button @click="showDropdown = !showDropdown" ref="showDropdownBox" class="border p-2 cursor-pointer flex items-center gap-3 rounded-lg relative border-blue">
            <div class="flex gap-2 items-center capitalize">
                <div class="bg-blue h-7 w-7 flex justify-center items-center uppercase text-white rounded-md">
                    {{ user?.name ? user?.name?.slice(0, 1) :  'U'}}
                </div>
                {{ user?.name ? user?.name : 'Unknown User' }}
            </div>
            <img src="@/assets/icons/dropdown.svg" alt="dropdown">

            <div v-if="showDropdown" class="dropdown_box">
                <div @click="logout" class="py-3 text-error px-5 hover:bg-light-grey cursor-pointer flex gap-3 items-center">
                    <img src="@/assets/icons/Logout.svg" alt="Logout">
                    Log Out
                </div>
            </div>
        </button>
    </div>
</template>
<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
const showDropdown = ref(false);
const showDropdownBox = ref(null);
const store = useStore()

const user = computed(() => store.state.auth.user)


const logout = () => {
    store.dispatch('logout')
}

const toggleDropdown = (event) => {
    if(showDropdownBox.value && !showDropdownBox.value.contains(event.target)) {
        showDropdown.value = false;
    }
}


onMounted(()=> {
        document.addEventListener('click', toggleDropdown)
    })

    onBeforeUnmount(() => {
  document.removeEventListener('click', toggleDropdown);
});
</script>

<style scoped>
.dropdown_box {
  position: absolute;
  width: 100%;
  top: 50px;
  right: 0;
  width: 250px;
  background-color: white;
  padding: 8px 0;
  border-radius: 8px;
  box-shadow: 0px 4px 4px #14141410;
  box-shadow: 0px 16px 32px -4px #14141430;
  z-index: 99999;
}
</style>