<script>
import Option from './Option.svelte';
import Question from './Question.svelte';
</script>

<h1>
	quiz is firing
</h1>

<Question />
<div class="options">
<Option>
A. Option A
</Option>
<Option>
B. Option B
</Option>
<Option>
C. Option C
</Option>
<Option>
D. Option D
</Option>
</div>

<style>
.options{
display:block;
}

</style>
