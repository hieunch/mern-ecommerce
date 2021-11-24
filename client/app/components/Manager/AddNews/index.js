import React, { useRef } from 'react';
import axios from 'axios';

import Input from '../../Common/Input';
import Button from '../../Common/Button';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import LoadingIndicator from '../../../components/Common/LoadingIndicator';

function AddNews(props){

    const {
        isLoading,
        user,
        newsFormData,
        formErrors,
        changeNews,
        addProductImage,
        addNews,
        brands
    } = props;
    
    const quillRef = useRef(null);

    const handleSubmit = event => {
        event.preventDefault();
        addNews();
    };

    const apiPostNewsImage = async (formData) => {
        const response = await axios.post(`/api/media`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
    
        if (response.data.success === true) {
            return response.data.imgUrl;
        }
        return `${window.location.origin}/images/loaders/placeholder.gif`;
    }

    const imageHandler = () => {
        const input = document.createElement('input');

        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();

        input.onchange = async () => {
            const file = input.files[0];
            const formData = new FormData();

            formData.append('image', file);

            // Save current cursor state
            const range = quillRef.current.getEditor().getSelection(true);

            // Insert temporary loading placeholder image
            quillRef.current.getEditor().insertEmbed(range.index, 'image', `${window.location.origin}/images/loaders/placeholder.gif`);

            // Move cursor to right side of image (easier to continue typing)
            quillRef.current.getEditor().setSelection(range.index + 1);

            const res = await apiPostNewsImage(formData); // API post, returns image location as string e.g. 'http://www.example.com/images/foo.png'

            // Remove placeholder image
            quillRef.current.getEditor().deleteText(range.index, 1);

            // Insert uploaded image
            // quillRef.current.getEditor().insertEmbed(range.index, 'image', res.body.image);
            quillRef.current.getEditor().insertEmbed(range.index, 'image', res);
        };
    }

    const modules = {
        toolbar: {
            container: [
                ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                ['blockquote', 'code-block'],

                [{ 'header': 1 }, { 'header': 2 }],               // custom button values
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
                [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
                [{ 'direction': 'rtl' }],                         // text direction

                [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

                [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
                [{ 'font': [] }],
                [{ 'align': [] }],

                ['clean'],                                        // remove formatting button
                ['link', 'image']
            ],
            // handlers: {
            //     image: imageHandler
            // }
        }
    };

    return (
        <div className='add-news'>
            {isLoading ? (
                <LoadingIndicator inline />
            ) : (
                <form onSubmit={handleSubmit} noValidate>
                    <Input placeholder="input placeholder" 
                        type={'textarea'}
                        // error={formErrors['title']}
                        label={'Tiêu đề'}
                        name={'title'}
                        placeholder={'Tiêu đề...'}
                        // onChange={(e)=>{newsFormData.title=e.target.value}}
                        onInputChange={(name, value) => {
                            changeNews(name, value);
                        }}
                    />
                    <Input placeholder="input placeholder" 
                        type={'text'}
                        // error={formErrors['title']}
                        label={'Từ khóa'}
                        name={'keywords'}
                        placeholder={'Từ khóa...'}
                        // onChange={(e)=>{newsFormData.keywords=e.target.value}}
                        onInputChange={(name, value) => {
                            changeNews(name, value);
                        }}
                    />
                    <div className="input-box">
                        <label>Nội dung</label>
                        <ReactQuill 
                            theme="snow"
                            ref={quillRef}
                            modules={modules}
                            onChange={(value)=>{changeNews("content", value)}} 
                        />
                    </div>
                    {/* <Input placeholder="input placeholder" 
                        onChange={(e)=>{image=e.target.value}}
                    /> */}
                    <div className='add-news-actions'>
                        <Button type='submit' text='Thêm tin tức' />
                    </div>
                </form>
            )}
        </div>
    );
};

export default AddNews;