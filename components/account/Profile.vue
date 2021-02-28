<template lang="pug">
    .profile
        .row
            //- .col-md-4
                f-upload-image(
                    isCenter
                    v-model="form.file"
                    height="150px"
                    width="150px")
            .col-md-6
                h4.mt-2.mb-2 Profil Saya
                p.mt-0.text-size-small.text-color-gray Kelola informasi profil Anda untuk mengontrol, melindungi dan mengamankan akun
                el-form.demo-refForm(:model='form' :rules='rules' ref='refForm' label-width='120px')
                    el-form-item(prop="name" label="Nama")
                        el-input(type="email" v-model="form.name")
                    el-form-item(label="Email")
                        el-input(type="email" v-model="form.email" disabled)
                    el-form-item(label="Password")
                        el-input(type="password" v-model="form.password" placeholder="masukan password")
                        small.text-color-gray Silahkan masukan password baru anda jika ingin mengganti password
                    el-button(type='primary' size="small" @click="submitForm()" v-loading.fullscreen.lock="response.isLoading") Simpan

</template>

<script>
import { handler } from '@/controllers/handler'
import { onMounted, reactive, ref, watch } from '@nuxtjs/composition-api'
export default {
  setup(_, ctx) {
    const { result, fetchData, form: response, patchData } = handler()

    const form = reactive({
      name: '',
      email: '',
      password: '',
    })

    const rules = reactive({
      name: [
        {
          required: true,
          message: 'Please input name',
          trigger: 'blur',
        },
      ],
    })

    const refForm = ref(null)

    function submitForm() {
      refForm.value.validate((valid) => {
        if (valid) {
          patchData(`/update_profile`, form)
        }
      })
    }

    watch(
      () => result,
      (value) => {
        if (value.response) {
          const data = value.response.data
          form.name = data.name
          form.email = data.email
        }
      },
      {
        deep: true,
      }
    )

    function fetchUsers() {
      fetchData('/user')
    }

    onMounted(() => {
      fetchUsers()
    })

    return {
      form,
      rules,
      refForm,
      submitForm,
      response,
    }
  },
}
</script>

<style lang="scss">
.profile {
  height: calc(100vh - 200px);
}
</style>
