import FormInput from "components/common/FormInput";
import Modal from "components/common/Modal";
import React, { useReducer } from "react";
import Button from "components/common/Button";
import { validateData } from "helpers/validator";
import { isObjectEmpty } from "utils/utils";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "redux-store/hooks";
import FormTextInput from "components/common/FormTextInput ";
import SelectInputDownMenu from "components/common/SelectInputDownMenu ";
import { setNews } from "redux-store/slices/news";

interface InitialState {
    formData: {headline: string, content: string, category: string, imgsrc: string, region: string},
    isLoading: boolean,
    errors: Object;
    showPassword: boolean
}
interface AddNewsModalProps {
    showModal: boolean;
    toggleModal: () => void;
    title?: string;   

}
const AddNewsModal = (props: AddNewsModalProps) => {
    const { showModal, toggleModal, title } = props;
    const dispatch = useAppDispatch();
    const { newsList } = useAppSelector((state) => state.news);
    const initialState: InitialState = {
        formData: {
            headline: '',
            content: '',
            category: '',
            imgsrc: '',
            region: ''
        },
        showPassword: false,
        errors: {},
        isLoading: false
    };

    const [state, setState]: any = useReducer((state: InitialState, newState: InitialState) => ({ ...state, ...newState }), initialState);
    const { errors, formData, isLoading, showPassword} = state;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setState({
            formData: {
                ...formData,
                [name]: value
            },
            errors: {
                ...errors,
                [name]: ''
            }
        });
    };

    const handleSelection = (value:string, name: string) => {
        setState({
            formData: {
                ...formData,
                [name]: value
            },
            errors: {
                ...errors,
                [name]: ''
            }
        });

    };

    const submitForm = async (e: React.SyntheticEvent<Element, Event>) => {
        e.preventDefault();
        const rules = {
            headline:  'required',
            content:  'required',
            category:  'required',
            imgsrc:  'required'
        };
        const messages = {
            'headline.required': 'News headline is required',
            'content.required': 'News content is required',
            'category.required': 'News category is required',
            'imgsrc.required': 'News image is required'
        };
        const validate = await validateData(formData, rules, messages);
        if (isObjectEmpty(validate)) {
            dispatch(setNews({...formData, time: '6 hrs ago', id: `${newsList.length + 1}` }));
            toast.success('News added successfully');
            toggleModal();
        } else {
            setState({
                errors: validate
            });
        }
    };


    return(
        <Modal 
            showModal={showModal}
            toggleModal={toggleModal}
            title={title}
        >
            <div className="mt-4">
                <FormInput
                    label="Headline"
                    placeholder="Enter news headline"
                    name="headline"
                    type="text"
                    onChange={handleInputChange}
                    showErrorMessage={errors?.headline}
                    errorMessage={errors?.headline}
                />
                <div className="mt-4">
                    <SelectInputDownMenu
                        data={[
                            {label: 'Main news', value:'main-news'},
                            {label: 'Latest news', value:'latest-news'},
                            {label: 'News grid', value:'news-grid'}
                        ]}
                        onSelect={handleSelection}
                        selectedId={formData?.category}
                        value=""
                        name="category"
                        label="News category"
                        placeholder="Select category"
                        hasCustomContent={false}
                        parentClassName="block w-full py-3.5 pl-3 pr-3 form-input  focus:border-[#000000]  border border-[#000000]  text-sm  border rounded-lg focus:ring-0"
                        showErrorMessage={errors?.category}
                        errorMessage={errors?.category}
                    />
                </div>
                <div className="mt-4">
                    <SelectInputDownMenu
                        data={[
                            {label: 'US & Canada', value:'us-canada'},
                            {label: 'Europe', value:'europe'},
                            {label: 'Africa', value:'africa'}
                        ]}
                        onSelect={handleSelection}
                        selectedId={formData?.region}
                        value=""
                        name="region"
                        label="Region"
                        placeholder="Select region"
                        hasCustomContent={false}
                        showErrorMessage={errors?.region}
                        errorMessage={errors?.region}
                        parentClassName="block w-full py-3.5 pl-3 pr-3 form-input  focus:border-[#000000]  border border-[#000000]  text-sm  border rounded-lg focus:ring-0"
                    />
                </div>
                <div className="mt-4">
                    <FormTextInput
                        label="News content"
                        placeholder="Enter news content"
                        name="content"
                        type="text"
                        onChange={handleInputChange}
                        rows={5}
                        showErrorMessage={errors?.content}
                        errorMessage={errors?.content}
                    />
                </div>
                <div className="mt-4">
                    <FormInput
                        label="Image url"
                        placeholder="Enter image url"
                        name="imgsrc"
                        type="text"
                        onChange={handleInputChange}
                        showErrorMessage={errors?.imgsrc}
                        errorMessage={errors?.imgsrc}
                    />
                </div>

                    
                <div className="mt-10 flex justify-end gap-x-3">
                    <Button
                        action={toggleModal}
                        text="Cancel"
                        disabled={isLoading}
                        className="dark-btn-outline rounded-md px-4 py-2"
                    />
                    <Button
                        action={(e: any) => submitForm(e)}
                        text="Save"
                        isLoading={isLoading}
                        disabled={isLoading}
                        className="dark-btn text-white rounded-md px-4 py-2"
                    />
                </div> 
            </div>
        </Modal>
    )
};

export default AddNewsModal;