<template>
    <div class="row">
        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12">
            <CardComponent>
                <template #card-header>
                    <span>Add a new category</span>
                </template>
                <template #card-body>
                    <input-component label="Tên Chuyên Mục" @keyup="convertToSlug(addChuyenMuc)" v-model="addChuyenMuc.ten_chuyen_muc" placeholder="Enter name catrgory..."></input-component>
                    <input-component label="Slug Chuyên Mục" disabled="disabled" v-model="addChuyenMuc.slug_chuyen_muc"></input-component>
                    <div class="row">
                        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                            <SelectComponent label="Danh Mục" :options="danhMuc" v-model="addChuyenMuc.id_chuyen_muc_cha"></SelectComponent>
                        </div>
                            <SelectComponent label="Tình Trạng" v-model="addChuyenMuc.tinh_trang" :options="tinhTrang"></SelectComponent>
                    </div>
                </template>
                <template #card-footer>
                    <button class="btn btn-primary float-end" @click="createChuyenMuc()">Add New</button>
                </template>
            </CardComponent>
        </div>
        <div class="col-xl-9 col-lg-9 col-md-9 col-sm-12">
            <CardComponent :required="false">
                <template #card-header>
                    <span>Category list</span>
                </template>
                <template #card-body>
                    <TableComponent :required="true">
                        <template #thead>
                            <tr>
                                <th class="text-center align-middle text-nowrap">#</th>
                                <th class="text-center align-middle text-nowrap">Category Name</th>
                                <th class="text-center align-middle text-nowrap">Directory</th>
                                <th class="text-center align-middle text-nowrap">Status</th>
                                <th class="text-center align-middle text-nowrap">Action</th>
                            </tr>
                        </template>
                        <template #tbody>
                            <template v-for="(value, index) in dataDanhMuc" :key="index">
                                <tr>
                                    <th class="text-center align-middle text-nowrap">{{ index + 1 }}</th>
                                    <td class="align-middle text-nowrap">{{ value.ten_chuyen_muc }}</td>
                                    <td class="align-middle text-nowrap">{{ value.id_chuyen_muc_cha ? value.ten_root : "Root" }}</td>
                                    <td class="text-center align-middle text-nowrap">
                                        <template v-if="value.tinh_trang === 1">
                                            <button class="btn btn-success" @click="changeStatus(value)" style="width: 120px;">Display</button>
                                        </template>
                                        <template v-else>
                                            <button class="btn btn  -info" @click="changeStatus(value)" style="width: 120px;">Pause</button>
                                        </template>
                                    </td>
                                    <td class="text-center align-middle text-nowrap">
                                        <ModalComponent style="width: 100px" color="primary" label="Chỉnh Sửa" titleId="editChuyenMuc" @click="Object.assign(editChuyenMuc, value)">
                                            <template #modal-header>Edit</template>
                                            <template #modal-body>
                                                <input-component label="Tên Chuyên Mục" @keyup="convertToSlug(editChuyenMuc)" v-model="editChuyenMuc.ten_chuyen_muc" placeholder="Enter name category..."></input-component>
                                                <input-component label="Slug Chuyên Mục" v-model="editChuyenMuc.slug_chuyen_muc" disabled></input-component>
                                                <SelectComponent label="Danh Mục" :options="danhMuc" v-model="editChuyenMuc.id_chuyen_muc_cha"></SelectComponent>
                                            </template>
                                            <template #modal-footer>
                                                <button class="btn btn-outline-dark me-2" data-bs-dismiss="modal">Close</button>
                                                <button class="btn btn-outline-primary">Update</button>
                                            </template>
                                        </ModalComponent>
                                        <ModalComponent style="width: 100px" color="danger" label="Xóa" titleId="xoaChuyenMuc" @click="Object.assign(deleteChuyenMuc, value)">
                                            <template #modal-header>Delete</template>
                                            <template #modal-body>
                                                Are you sure you want to delete <span><b><i class="text-danger">{{ deleteChuyenMuc.ten_chuyen_muc }}</i></b></span> off the list or not?
                                            </template>
                                            <template #modal-footer>
                                                <button class="btn btn-outline-dark me-2" data-bs-dismiss="modal">Close</button>
                                                <button class="btn btn-outline-danger">Delete</button>
                                            </template>
                                        </ModalComponent>
                                    </td>
                                </tr>
                            </template>
                        </template>
                    </TableComponent>
                </template>
            </CardComponent>
        </div>
    </div>
</template>
<script>
import CardComponent from '@/components/CardComponent.vue';
import InputComponent from '@/components/InputComponent.vue';
import SelectComponent from '@/components/SelectComponent.vue';
import TableComponent from '@/components/TableComponent.vue';
import ModalComponent from '@/components/ModalComponent.vue';
import { ref, computed, onMounted } from 'vue';
import { useStore } from "vuex";
import axios from '@/axiosConfig';
import Toast from '@/toastConfig';
import $ from 'jquery';
export default {
    name : "chuyen-muc",
    components : {
        CardComponent,
        InputComponent,
        SelectComponent,
        TableComponent,
        ModalComponent,
    },
    setup() {
        const store = useStore();
        const addChuyenMuc = ref({});
        const editChuyenMuc = ref({});
        const deleteChuyenMuc = ref({});
        const tinhTrang = computed(() => store.state.tinh_trang);
        const danhMuc = computed(() => {
            return store.state.danh_muc_select.filter((item) => item.tinh_trang === 1);
        });

        const dataDanhMuc = computed(() => store.state.dataDanhMuc);
        function convertToSlug(obj) {
            obj.slug_chuyen_muc = store.getters.toSlug(obj.ten_chuyen_muc);
        }

        function createChuyenMuc() {
            axios
                .post('admin/chuyen-muc/create', addChuyenMuc.value,'admin')
                .then((res) => {
                    if (res.data.status == true) {
                        Toast('success', res.data.message);
                        addChuyenMuc.value = {};
                        store.dispatch("onFetchChuyenMuc");//call api store == onFetchChuyenMuc
                    }else {
                        Toast("error", res.data.message);
                    }
                })
                .catch((res) => {
                    $.each(res.response.data.errors, function(k, v) {
                        Toast('error', v[0]);
                    });
                });
        }

        function changeStatus(value) {
            axios
                .post('admin/chuyen-muc/change-status', value,'admin')
                .then((res) => {
                    if (res.data.status == true) {
                        Toast('success', res.data.message);
                        store.dispatch("onFetchChuyenMuc");//call api store == onFetchChuyenMuc
                    }else {
                        Toast("error", res.data.message);
                    }
                })
                .catch((res) => {
                    $.each(res.response.data.errors, function(k, v) {
                        Toast('error', v[0]);
                    });
                });
        }

        onMounted(() => {
            store.dispatch("onFetchChuyenMuc");
        });

        return { addChuyenMuc, editChuyenMuc, deleteChuyenMuc, createChuyenMuc, changeStatus, convertToSlug, danhMuc, tinhTrang, dataDanhMuc };
    }
}
</script>