<template>
<div class="page-content">
    <div class="row mb-3">
        <div class="col-12 text-end">
            <button class="btn btn-outline-primary px-5 radius-30" data-bs-toggle="modal" data-bs-target="#themMoiModal">
                <b>Add New</b>
            </button>
        </div>
    </div>
    <div class="modal fade" id="themMoiModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">
                        Add new ingredients
                    </h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="row">
                            <div class="col-6">
                                <label class="form-label">Name of raw materials</label><input v-model="addNguyenLieu.ten_nguyen_lieu" @keyup="convertToSlug(addNguyenLieu)" type="text" class="form-control" placeholder="Enter an ingredient name" />
                            </div>
                            <div class="col-6">
                                <label class="form-label">Slug Raw Materials</label><input v-model="addNguyenLieu.slug_nguyen_lieu" disabled type="text" class="form-control" placeholder="Import slug raw materials" />
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-6">
                                <label class="form-label mt-3">Price</label><input v-model="addNguyenLieu.gia" type="number" class="form-control" placeholder="0" />
                            </div>
                            <div class="col-6">
                                <label class="form-label mt-3">Units</label>
                                <input v-model="addNguyenLieu.don_vi_tinh" type="text" class="form-control" placeholder="Units of calculationh" />
                            </div>

                        </div>
                        <div class="row">

                            <div class="col-12">
                                <label class="form-label mt-3">Status</label><select v-model="addNguyenLieu.tinh_trang" class="form-control">
                                    <option value="1">Display</option>
                                    <option value="0">Pause</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        Close</button><button @:click="createNguyenLieu()" type="button" class="btn btn-primary" data-bs-dismiss="modal">
                        Add New
                    </button>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="card border-top border-0 border-4 border-primary">
            <div class="card-header">
                <h5>List of ingredients</h5>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th colspan="100%">
                                    <div class="input-group mb-3">
                                        <input v-on:keyup.enter="searchNguyenLieu()" v-model="search.abc" type="text" class="form-control" placeholder="Enter what you're looking for" /><button v-on:click="searchNguyenLieu()" class="btn btn-primary">
                                            <i class="fa-solid fa-magnifying-glass"></i>
                                        </button>
                                    </div>
                                </th>
                            </tr>
                            <tr>
                                <th class="text-center align-middle text-nowrap">
                                    #
                                </th>
                                <th class="text-center align-middle text-nowrap">
                                    Name of raw materials
                                </th>
                                <th class="text-center align-middle text-nowrap">
                                    Slug Raw Materials
                                </th>
                                <th class="text-center align-middle text-nowrap">
                                  Pricer
                                </th>

                                <th class="text-center align-middle text-nowrap">
                                    Units
                                </th>
                                <th class="text-center align-middle text-nowrap">
                                   Status
                                </th>
                                <th class="text-center align-middle text-nowrap">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <template v-for="(value, key) in dataNguyenLieu" :key="key">
                                <tr>
                                    <th class="text-center align-middle text-nowrap">
                                        {{ key + 1 }}
                                    </th>
                                    <td class="align-middle text-nowrap">
                                        {{ value.ten_nguyen_lieu }}
                                    </td>
                                    <td class="align-middle text-nowrap">
                                        {{ value.slug_nguyen_lieu }}
                                    </td>
                                    <td class="text-end align-middle text-nowrap">
                                        {{ formatToVN(value.gia) }}
                                    </td>

                                    <td class="text-center align-middle text-nowrap">
                                        {{ value.don_vi_tinh }}
                                    </td>
                                    <td class="text-center align-middle text-nowrap">
                                        <button @click="changeStatus(value)" v-if="value.tinh_trang == 1" class="btn btn-success" style="width: 100px">
                                         Display
                                        </button>
                                        <button @click="changeStatus(value)" v-else class="btn btn-info" style="width: 100px">
                                            Pause
                                        </button>
                                    </td>
                                    <td class="text-center align-middle text-nowrap">
                                        <button @click="Object.assign(updateNguyenLieu, value)" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#capNhatModal" style="width: 100px; margin-right: 4px;">
                                           Update
                                        </button>
                                        <button @click="Object.assign(detete_nguyen_lieu, value)" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#xoaModal" style="width: 100px">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            </template>

                        </tbody>
                    </table>
                </div>
                <div class="modal fade" id="capNhatModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="exampleModalLabel">
                                    Update materials
                                </h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <div class="row">
                                    <div class="row">
                                        <div class="col-6">
                                            <label class="form-label">Name of raw materials</label><input v-model="
                                                        updateNguyenLieu.ten_nguyen_lieu
                                                    " @keyup="
                                                        convertToSlug(
                                                            updateNguyenLieu
                                                        )
                                                    " tosl type="text" class="form-control" placeholder="Enter Name of raw materials" />
                                        </div>
                                        <div class="col-6">
                                            <label class="form-label">Slug Raw Materials</label><input v-model="
                                                        updateNguyenLieu.slug_nguyen_lieu
                                                    " type="text" disabled="" class="form-control" placeholder="Nhập Slug Raw Materials" />
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-6">
                                            <label class="form-label mt-3">Price</label><input v-model="
                                                        updateNguyenLieu.gia
                                                    " type="number" class="form-control" placeholder="0" />
                                        </div>

                                        <div class="col-6">
                                            <label class="form-label mt-3">Units</label><input v-model="
                                                        updateNguyenLieu.don_vi_tinh
                                                    " type="text" class="form-control" placeholder="Units" />
                                        </div>
                                    </div>
                                    <div class="row">

                                        <div class="col-12">
                                            <label class="form-label mt-3">Status</label><select v-model="
                                                        updateNguyenLieu.tinh_trang
                                                    " class="form-control">
                                                <option value="1">
                                                    Display
                                                </option>
                                                <option value="0">
                                                    Pause
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                                    Close</button><button @click="capnhatNguyenLieu()" type="button" class="btn btn-primary" data-bs-dismiss="modal">
                                   Update
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal fade" id="xoaModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="exampleModalLabel">
                                    Remove materials
                                </h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <div class="alert alert-warning border-0 bg-warning alert-dismissible fade show py-2">
                                    <div class="d-flex align-items-center">
                                        <div class="font-35 text-dark">
                                            <i class="bx bx-info-circle"></i>
                                        </div>
                                        <div class="ms-3">
                                            <h6 class="mb-0 text-dark">
                                                Warning
                                            </h6>
                                            <div class="text-dark">
                                                <p>
                                                    Do you want to delete the product
                                                    <b>{{
                                                            detete_nguyen_lieu.ten_nguyen_lieu
                                                        }}</b>
                                                    hey?
                                                </p>
                                                <p>
                                                    <b>Note:</b> This
                                                    can't be undone!
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                                    Close</button><button @click="
                                            deleteNguyenLieu(detete_nguyen_lieu)
                                        " type="button" class="btn btn-danger" data-bs-dismiss="modal">
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import {
    ref,
    computed,
    onMounted
} from "vue";
import {
    useStore
} from "vuex";
import axios from "@/axiosConfig";
import Toast from "@/toastConfig";
import $ from "jquery";
export default {
    name: "nguyen-lieu",
    setup() {
        const store = useStore();
        const addNguyenLieu = ref({});
        const updateNguyenLieu = ref({});
        const detete_nguyen_lieu = ref({});
        const search = ref({});
        const convertToSlug = (obj) => {
            obj.slug_nguyen_lieu = store.getters.toSlug(obj.ten_nguyen_lieu);
        };
        const dataNguyenLieu = computed(() => {
            return store.state.dataNguyenLieu;
        });

        function createNguyenLieu() {
            axios
                .post("admin/nguyen-lieu/tao-nguyen-lieu", addNguyenLieu.value,'admin')
                .then((res) => {
                    if (res.data.status == true) {
                        Toast("success", res.data.message);
                        addNguyenLieu.value = {};
                        store.dispatch("onFetchNguyenLieu"); //call api store == onFetchChuyenMuc
                    }else {
                        Toast("error", res.data.message);
                    }
                })
                .catch((res) => {
                    $.each(res.response.data.errors, function (k, v) {
                        Toast("error", v[0]);
                    });
                });
        }

        function capnhatNguyenLieu() {
            axios
                .post(
                    "admin/nguyen-lieu/cap-nhat-nguyen-lieu",
                    updateNguyenLieu.value,'admin'
                )
                .then((res) => {
                    if (res.data.status == true) {
                        Toast("success", res.data.message);
                        $("#edit_monan").modal("toggle");
                        updateNguyenLieu.value = {};
                        store.dispatch("onFetchNguyenLieu"); //call api store == onFetchChuyenMuc
                    }else {
                        Toast("error", res.data.message);
                    }
                })
                .catch((res) => {
                    $.each(res.response.data.errors, function (k, v) {
                        Toast("error", v[0]);
                    });
                });
        }

        function changeStatus(value) {
            axios
                .post("admin/nguyen-lieu/doi-trang-thai", value,'admin')
                .then((res) => {
                    if (res.data.status == true) {
                        Toast("success", res.data.message);
                        store.dispatch("onFetchNguyenLieu"); //call api store == onFetchChuyenMuc
                    }else {
                        Toast("error", res.data.message);
                    }
                })
                .catch((res) => {
                    $.each(res.response.data.errors, function (k, v) {
                        Toast("error", v[0]);
                    });
                });
        }

        function deleteNguyenLieu(value) {
            axios
                .post("admin/nguyen-lieu/xoa-nguyen-lieu", value,'admin')
                .then((res) => {
                    if (res.data.status == 1) {
                        Toast("success", res.data.message);
                        store.dispatch("onFetchNguyenLieu"); // api store == onFetchChuyenMuc
                    }else {
                        Toast("error", res.data.message);
                    }
                })
                .catch((res) => {
                    $.each(res.response.data.errors, function (k, v) {
                        Toast("error", v[0]);
                    });
                });
        }

        function searchNguyenLieu() {
            axios
                .post('admin/nguyen-lieu/tim-nguyen-lieu', search.value,'admin')
                .then((res) => {
                    console.log(res.data.data);
                    store.commit('fecthNguyenLieu', res.data.data);
                });
        }
        const tinhTrang = computed(() => store.state.tinh_trang);
        onMounted(() => {
            store.dispatch("onFetchNguyenLieu");
        });

        function formatToVN(number) {
            number = parseInt(number);
            return number.toLocaleString('vi-VN', {
                style: 'currency',
                currency: 'VND'
            });
        }
        return {
            addNguyenLieu,
            tinhTrang,
            dataNguyenLieu,
            updateNguyenLieu,
            detete_nguyen_lieu,
            createNguyenLieu,
            convertToSlug,
            capnhatNguyenLieu,
            changeStatus,
            deleteNguyenLieu,
            searchNguyenLieu,
            search,
            formatToVN,
        };
    },
};
</script>

<style lang=""></style>
